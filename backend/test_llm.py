from services.response_generator import generate_response

response = generate_response(
    query="My payment failed and money was deducted.",
    intent="payment_issue",
    sentiment="Negative",
    priority="Critical",
)

print("\nGenerated Response:\n")
print(response)