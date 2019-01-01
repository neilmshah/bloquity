#!/bin/sh

curl -X POST \
  http://107.23.194.9:4000/api/org.digitalproperty.Property \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 25aaaeaf-05c7-452c-95ee-fd6cbf0842aa' \
  -H 'cache-control: no-cache' \
  -d '{
    "propertyId": "709winsteadctunit12394087",
    "transactionHistory": []
}'

curl -X POST \
  http://107.23.194.9:4000/api/org.digitalproperty.TransactionDetails \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 8a74c3e1-9197-413c-bf39-fd1cffab7aa4' \
  -H 'cache-control: no-cache' \
  -d '{
    "buyer":"Rachel Rodriguez",
    "seller":"Lenna Corp",
    "trans_amt":"150,000",
    "trans_date":"08/10/1981",
    "property":"709winsteadctunit12394087"
}'

curl -X POST \
  http://107.23.194.9:4000/api/org.digitalproperty.TransactionDetails \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 8a74c3e1-9197-413c-bf39-fd1cffab7aa4' \
  -H 'cache-control: no-cache' \
  -d '{
    "buyer":"Robert Smith",
    "seller":"Rachel Rodriguez",
    "trans_amt":"200,000",
    "trans_date":"05/08/1988",
    "property":"709winsteadctunit12394087"
}'

curl -X POST \
  http://107.23.194.9:4000/api/org.digitalproperty.TransactionDetails \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 8a74c3e1-9197-413c-bf39-fd1cffab7aa4' \
  -H 'cache-control: no-cache' \
  -d '{
    "buyer":"David Smith",
    "seller":"Robert Smith",
    "trans_amt":"350,000",
    "trans_date":"04/10/1995",
    "property":"709winsteadctunit12394087"
}'

curl -X POST \
  http://107.23.194.9:4000/api/org.digitalproperty.TransactionDetails \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 8a74c3e1-9197-413c-bf39-fd1cffab7aa4' \
  -H 'cache-control: no-cache' \
  -d '{
    "buyer":"Maria Garcia",
    "seller":"David Smith",
    "trans_amt":"400,000",
    "trans_date":"11/05/2002",
    "property":"709winsteadctunit12394087"
}'

curl -X POST \
  http://107.23.194.9:4000/api/org.digitalproperty.TransactionDetails \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 8a74c3e1-9197-413c-bf39-fd1cffab7aa4' \
  -H 'cache-control: no-cache' \
  -d '{
    "buyer":"Nishtha Atrey",
    "seller":"Maria Garcia",
    "trans_amt":"800,000",
    "trans_date":"09/02/2012",
    "property":"709winsteadctunit12394087"
}'


curl -X POST \
  http://107.23.194.9:4000/api/org.digitalproperty.Property \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 25aaaeaf-05c7-452c-95ee-fd6cbf0842aa' \
  -H 'cache-control: no-cache' \
  -d '{
    "propertyId": "245florencestunit594086",
    "transactionHistory": []
}'

curl -X POST \
  http://107.23.194.9:4000/api/org.digitalproperty.TransactionDetails \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 8a74c3e1-9197-413c-bf39-fd1cffab7aa4' \
  -H 'cache-control: no-cache' \
  -d '{
    "buyer":"Matt Smith",
    "seller":"Taylor Morrison",
    "trans_amt":"200,000",
    "trans_date":"1957-08-10",
    "property":"245florencestunit594086"
}'

curl -X POST \
  http://107.23.194.9:4000/api/org.digitalproperty.TransactionDetails \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 8a74c3e1-9197-413c-bf39-fd1cffab7aa4' \
  -H 'cache-control: no-cache' \
  -d '{
    "buyer":"Roger Mathew",
    "seller":"Matt Smith",
    "trans_amt":"300,000",
    "trans_date":"1967-05-08",
    "property":"245florencestunit594086"
}'

curl -X POST \
  http://107.23.194.9:4000/api/org.digitalproperty.TransactionDetails \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 8a74c3e1-9197-413c-bf39-fd1cffab7aa4' \
  -H 'cache-control: no-cache' \
  -d '{
    "buyer":"Brenden Gomez",
    "seller":"Roger Mathew",
    "trans_amt":"500,000",
    "trans_date":"1980-04-10",
    "property":"245florencestunit594086"
}'

curl -X POST \
  http://107.23.194.9:4000/api/org.digitalproperty.TransactionDetails \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 8a74c3e1-9197-413c-bf39-fd1cffab7aa4' \
  -H 'cache-control: no-cache' \
  -d '{
    "buyer":"Maria Garcia",
    "seller":"Brenden Gomez",
    "trans_amt":"1,000,000",
    "trans_date":"2002-11-05",
    "property":"245florencestunit594086"
}'

curl -X POST \
  http://107.23.194.9:4000/api/org.digitalproperty.TransactionDetails \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 8a74c3e1-9197-413c-bf39-fd1cffab7aa4' \
  -H 'cache-control: no-cache' \
  -d '{
    "buyer":"Nishtha Atrey",
    "seller":"Maria Garcia",
    "trans_amt":"1,500,000",
    "trans_date":"2012-09-02",
    "property":"245florencestunit594086"
}'