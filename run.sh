HOST=localhost:3000

echo '\n\n creating Cow'
CREATE=$(
curl --silent -X POST \
    --header "Content-Type: application/json" \
    --data-binary '{"collarId":"261","cowNumber":"88261","collarStatus":"Healthy"}' \
    $HOST/cows
)

echo $CREATE | jq

ID=$(echo $CREATE | jq .id)

echo "\n\n requesting cow $ID"
curl --silent $HOST/cows/$ID | jq

echo '\n\n requesting all cows'
curl --silent $HOST/cows | jq

echo "\n\n updating cow $ID"
curl --silent -X PUT \
    --header "Content-Type: application/json" \
    --data-binary '{"collarId":261,"cowNumber":88261,"collarStatus":"Broken"}' \
    $HOST/cows/$ID \
    | jq

echo "\n\n requesting id: $ID"
curl --silent $HOST/heroes/$ID | jq

echo '\n\n requesting all heroes'
curl --silent $HOST/heroes | jq
