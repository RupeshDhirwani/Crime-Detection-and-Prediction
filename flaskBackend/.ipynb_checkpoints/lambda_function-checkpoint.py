import numpy as np
import pandas as pd
import joblib
import warnings

warnings.filterwarnings("ignore", message="Trying to unpickle estimator KMeans from version")

df = pd.DataFrame()  # Declare df in global namespace

def initFunc():
    global df
    df = pd.read_csv('flaskBackend/editedDataSet.csv')
    df['Timestamp'] = pd.to_datetime(df['Timestamp'])

def getCrimes(district, day, hour):
    global df  # Add this line to access df from the global namespace
    df1 = df[df['DISTRICT_ID'] == f'{district}']
    df1 = df1[df1['Timestamp'].dt.dayofweek == day]
    df1 = df1[df1['Timestamp'].dt.hour == hour]
    return df1.shape[0]

def getCluster(crimes):
    # Load the saved model from the file
    model = joblib.load('flaskBackend/kmeans.pkl')
    data = np.array([crimes])
    data = data.reshape(-1, 1)
    label = model.predict(data)
    return label[0]
  
labels = ['High', 'Very Low', 'Normal', 'Low', 'Very High']

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.before_first_request
def setup():
    # Do any setup required here
    print('Flask server is starting up...')
    print('Loading dataset')
    initFunc()
    print('Loaded Dataset')

@app.route('/district/<int:district>/day/<int:day>/hour/<int:hour>')
def output_route(district, day, hour):
    num_crimes = getCrimes(district=district, day=day, hour=hour)
    clusterLabel = getCluster(num_crimes)
    print(labels[clusterLabel])
    return f'{labels[clusterLabel]}'

if __name__ == '__main__':
    app.run()
