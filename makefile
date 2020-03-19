all: test test_chrome

test:
	  npx cypress run --headed --spec "cypress/integration/widget-message.spec.js"

test_chrome:
	  npx cypress run --browser chrome --spec "cypress/integration/widget-message.spec.js"
