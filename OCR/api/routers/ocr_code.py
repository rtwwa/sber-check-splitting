from PIL import Image, ImageEnhance, ImageFilter
import pytesseract
import re
import json
import os

def preprocess_image(image_path):
    image = Image.open(image_path).convert('L')
    image = image.filter(ImageFilter.MedianFilter())
    image = ImageEnhance.Contrast(image).enhance(2)
    return image


def extract_text(image):
    config = '--oem 3 --psm 6'
    return pytesseract.image_to_string(image, lang='rus+eng', config=config)


def parse_receipt_text(text):
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    products = []
    total_account = None

    total_pattern = re.compile(r'(итого|оплате|всего).{0,10}?(\d[\d\s]*[.,]\d{2})', re.IGNORECASE)
    product_pattern = re.compile(r'^(.+?)\s+(\d+)[xX*×]?\s*(\d{2,6})$')
    simple_pattern = re.compile(r'^(.+?)\s+(\d+)\s+(\d{2,6})$')

    for line in lines:
        line = line.replace(" ", " ")
        # ищем ИТОГО
        total_match = total_pattern.search(line)
        if total_match:
            raw_total = total_match.group(2).replace(" ", "").replace(",", ".")
            try:
                total_account = float(raw_total)
            except:
                pass
            continue

        # формат "Блюдо 2x450"
        m = product_pattern.match(line)
        if m:
            name = m.group(1).strip()
            qty = int(m.group(2))
            price = int(m.group(3))
            products.append({
                "name": name,
                "numberServings": qty,
                "price": price,
                "total": qty * price
            })
            continue

        # формат "Блюдо 2 450"
        m2 = simple_pattern.match(line)
        if m2:
            name = m2.group(1).strip()
            qty = int(m2.group(2))
            price = int(m2.group(3))
            products.append({
                "name": name,
                "numberServings": qty,
                "price": price,
                "total": qty * price
            })

    # если не нашли итог — считаем вручную
    if total_account is None:
        total_account = sum(p['total'] for p in products)

    return {
        "total_account": int(total_account),
        "products": products
    }


def image_to_json_model(image_path: str) -> dict:
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Файл {image_path} не найден")

    image = preprocess_image(image_path)
    text = extract_text(image)
    data = parse_receipt_text(text)
    return data


# Пример использования
def ocr_run(image_path: str):
    try:
        result = image_to_json_model(image_path)
        return result
    except Exception as e:
        print(f"Ошибка: {e}")
