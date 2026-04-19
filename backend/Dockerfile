FROM python:3.10

WORKDIR /app

# تثبيت المتطلبات الأساسية
RUN apt-get update && apt-get install -y libgl1

# نسخ المتطلبات وتثبيتها قبل نسخ باقي الملفات لتقليل زمن إعادة البناء
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# نسخ جميع ملفات المشروع
COPY . .

# تأكد من نسخ `model.h5` بعد نسخ جميع الملفات

EXPOSE 5000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]
