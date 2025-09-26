import pickle
import numpy as np
from sklearn.linear_model import LogisticRegression

# Dummy dataset: [GPA, Attendance, Assignments, Participation]
X = np.array([
    [3.5, 90, 8, 7],
    [2.0, 60, 3, 4],
    [3.8, 95, 9, 8],
    [1.5, 40, 1, 2],
    [2.8, 70, 5, 5],
    [3.2, 85, 7, 6],
])
y = np.array([0, 1, 0, 1, 1, 0])  # 0 = Low risk, 1 = High risk

model = LogisticRegression()
model.fit(X, y)

with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained and saved as model.pkl")
