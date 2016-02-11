# librato-cli - Overview #

_librato-cli_ is a command-line tool interacting with the Librato API (https://www.librato.com/docs/api).

## Getting Started ##
```
npm install
./librato-cli help
```

## Configuration ##
_librato-cli_ requires a token and API key to access the API. You can generate these through your Librato account.

```json
{
  "librato_token" : "<your_token>",
  "librato_apikey" : "<your_api_key>",
  "base_url" : "https://metrics-api.librato.com/v1/"
}
```

## Usage ##

```
#list all charts on the space with id 12345
./librato-cli chart list 12345

#list all metric sources in librato
./librato-cli source list

#list all spaces in librato
./librato-cli space list

#get definition for space 65408
./librato-cli space get 65408

#list all metrics (limit 100)
./librato-cli metric list

#list metrics that match the 'foo.bar' filter pattern
./librato-cli metric list foo.bar

#update metric named 'foo.bar', setting its summarize function to use summation
./librato-cli attr foo.bar summarize_function=sum

#export the definition of an existing chart to a file
./librato-cli chart export 65408 591000 > test.json

#import that chart definition to a different space
./librato-cli chart import 65409 "$(cat test.json)"

#export the definition of an entire space (including all of its charts) to a file
./librato-cli space export 65408 > test.json

#import that space definition as a brand new space
./librato-cli space import "$(cat test.json)"
```
