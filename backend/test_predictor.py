from pprint import pprint

from services.predictor import predict_ticket

query = "My payment failed and money has been deducted."

result = predict_ticket(query)

pprint(result)