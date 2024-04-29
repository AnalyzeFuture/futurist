import pandas as pd
import seaborn as sns
import json
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from xgboost import XGBClassifier
from sklearn.tree import DecisionTreeClassifier
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

df = pd.read_csv("post/Predict/placedata.csv")
print("First columns : ",df.columns)
desired_min = 1
desired_max = 55

# Initialize MinMaxScaler with the desired range
scaler = MinMaxScaler(feature_range=(desired_min, desired_max))

# Fit and transform the data
scaled_data = scaler.fit_transform(df[['AptitudeTestScore']])


# Convert the scaled data array back to DataFrame
df_scaled = pd.DataFrame(scaled_data, columns=['AptitudeTestScore'])

df.rename(columns={'AptitudeTestScore': 'skill_count'}, inplace=True)

columns_to_drop = ['StudentID','Internships','SoftSkillsRating',
       'PlacementTraining', 'SSC_Marks',
       'HSC_Marks']
df = df.drop(columns=columns_to_drop)

print("After drop",df.columns)
y = df["PlacementStatus"]
X = df.drop(['PlacementStatus'],axis = 1)

X['ExtracurricularActivities'] = X['ExtracurricularActivities'].str.strip().replace({'Yes': 1, 'No': 0})
y = y.str.strip().replace({'Placed': 1, 'NotPlaced': 0})

X_train,X_val,y_train,y_val = train_test_split(X,y,test_size = 0.2,random_state = 1)

xgboost = XGBClassifier(n_estimators=1000, learning_rate=0.01)
xgboost.fit(X_train, y_train, 
             early_stopping_rounds=5, 
             eval_set=[(X_val, y_val)], 
             verbose=False)

preds = xgboost.predict(X_val)


# Create a DataFrame from the input data
@csrf_exempt
def predict(request):
    
    if request.method == "POST":
        body_str = request.body.decode('utf-8')

        # Parse the JSON data
        body_data = json.loads(body_str)

        input_df = pd.DataFrame(body_data,index=[0])

        result = xgboost.predict(input_df)
        print("result : ",result)
        print("type : ",type(result))
        # result = {"Placed" : result}
        # if result:
        #     return JsonResponse(result)
        # else:
        #     return HttpResponse("No Result")
        return HttpResponse(result)
