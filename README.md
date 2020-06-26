# Django-React-Chat-App

React app on top of Django Rest Api with a Pytorch Chatbot

## Installing dependencies

`$ pip install -r requirements.txt`

- No need to install node packages useless you want to change frontend(Since they are compiled in static files already)

#### For node dependencies

`$ cd frontend & npm i`

- Only dev dependencies are there.

To compile:
`$ npm run dev` or `$ npm run build`

## Running the project

`$ python manage.py runserver`

### Ver 0.3
- Faster, Better looking

### Ver 0.2

- Added Pytorch Chatbot
- Added Logout feature,auto scroll,minor layout change
- Removed Redundant floders and imports
- Added Requirements.txt,updated gitignore for chatbot files
- **Missing** --> pytorch chatbot weight files, run the Chatbot.ipynb to generate

### Ver 0.1

- Initial commit
- Added Login,Room Creation, Room join features
- Added authentication by django Auth tokens
- FrontEnd - React Complied by webpack
- Backend - DjangoRestFramework
- Both front and back intergrated into a single django project(So that one process handles both)
