from flask_cors import CORS
from flask import Flask
import numpy as np
import pandas as pd
import joblib
import warnings
from prophet.serialize import model_to_json, model_from_json

warnings.filterwarnings(
    "ignore", message="Trying to unpickle estimator KMeans from version")
warnings.filterwarnings("ignore", category=UserWarning,
                        message="X does not have valid feature names")
warnings.filterwarnings("ignore", category=FutureWarning,
                        message="The behavior of Timestamp.utcfromtimestamp is deprecated")

df = pd.DataFrame()  # Declare df in global namespace
m1 = None
m2 = None
m3 = None
m4 = None
m5 = None
m6 = None
m7 = None


def initFunc():

    print('Loading Variables')
    global df
    global m1
    global m2
    global m3
    global m4
    global m5
    global m6
    global m7

    # Loading Prophet Models
    print('Loading Prophet Models')
    with open('ForecastModels/m1.json', 'r') as fin:
        m1 = model_from_json(fin.read())  # Load model1
    with open('ForecastModels/m2.json', 'r') as fin:
        m2 = model_from_json(fin.read())  # Load model2
    with open('ForecastModels/m3.json', 'r') as fin:
        m3 = model_from_json(fin.read())  # Load model3
    with open('ForecastModels/m4.json', 'r') as fin:
        m4 = model_from_json(fin.read())  # Load model4
    with open('ForecastModels/m5.json', 'r') as fin:
        m5 = model_from_json(fin.read())  # Load model5
    with open('ForecastModels/m6.json', 'r') as fin:
        m6 = model_from_json(fin.read())  # Load model6
    with open('ForecastModels/m7.json', 'r') as fin:
        m7 = model_from_json(fin.read())  # Load model7


def getPred(m, date, district):
    print(f'Getting prediction for district {district} for {date}')
    future_date = pd.DataFrame({'ds': [date]})
    forecast = m.predict(future_date)
    y_pred = forecast['yhat'][0]
    return y_pred


def getCluster(val):
    # Load the saved model from the file
    print(f'Assigning Cluster to {val}')
    model = joblib.load('flaskBackend/forecastLabels.pkl')
    data = np.array([val])
    data = data.reshape(-1, 1)
    label = model.predict(data)
    return label[0]


labels = ['Normal', 'Very Low', 'High', 'Low', 'Very High']


def Prediction(date):

    print('Loading Variables')
    global m1
    global m2
    global m3
    global m4
    global m5
    global m6
    global m7

    print(f'Getting Predictions for all districts for {date}')
    pred1 = getPred(m1, date, 1)
    pred2 = getPred(m2, date, 2)
    pred3 = getPred(m3, date, 3)
    pred4 = getPred(m4, date, 4)
    pred5 = getPred(m5, date, 5)
    pred6 = getPred(m6, date, 6)
    pred7 = getPred(m7, date, 7)

    print(f'Getting Labels for all districts for date {date}')
    label1 = getCluster(pred1)
    label2 = getCluster(pred2)
    label3 = getCluster(pred3)
    label4 = getCluster(pred4)
    label5 = getCluster(pred5)
    label6 = getCluster(pred6)
    label7 = getCluster(pred7)

    return [label1, label2, label3, label4, label5, label6, label7]


app = Flask(__name__)
CORS(app)


@app.before_first_request
def setup():
    # Do any setup required here
    print('Flask server is starting up...')
    initFunc()


@app.route('/date/<date>')
def output_route(date):
    district_labels = Prediction(date.replace('%20', ' '))
    return f'{district_labels}'


if __name__ == '__main__':
    app.run()
