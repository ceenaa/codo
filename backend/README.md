# How to set up without docker in dev mode

### 1. Go to backend folder

### 2. Create and activate virtual environment
create a virtual environment with this command. (if python3-venv is not installed, install it)
```
python3 -m venv venv
```
then you need to activate it. </br>

in linux and mac:
```
source venv/bin/activate
```
in windows:
```
venv\Scripts\activate
```  

### 4. Install the requirements.
```
pip install -r requirements.txt
```

### 5. Create a .env file
create a .env file in the backend folder and add the following variables:
```
SECRET_KEY=your_secret_key
DEBUG=True
DJANGO_ADMIN=True
```
### 6. Get ready the database
```
python manage.py migrate
python manage.py makemigrations
```
Also you can create a superuser for admin panel if it is needed.
```
python manage.py createsuperuser
```
then fill the questions.

### 7. Run the server
```
python manage.py runserver
```