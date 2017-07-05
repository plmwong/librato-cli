# librato-cli - Overview #

[![Build Status](https://travis-ci.org/plmwong/librato-cli.svg?branch=master)](https://travis-ci.org/plmwong/librato-cli)

_librato-cli_ is a command-line tool for interacting with the Librato API (https://www.librato.com/docs/api).

## Features ##
* Listing of sources, metrics, spaces and charts
* Changing attributes on individual metrics
* Import/export of individual charts
* Import/export of entire spaces

## Getting Started ##
```bash
npm install github:plmwong/librato-cli -g
librato-cli help
```

## Configuration ##
_librato-cli_ requires a token and API key to access the API. You can generate these through your Librato account.

```json
{
  "libratoToken" : "<your_token>",
  "libratoApiKey" : "<your_api_key>",
  "baseUrl" : "https://metrics-api.librato.com/v1/"
}
```

## Usage ##

```bash
#set the token / apikey for librato-cli
librato-cli config settoken foo_token
librato-cli config setapikey bar_api_key

#list all charts on the space with id 12345
librato-cli chart list 12345

#list all metric sources in librato
librato-cli source list

#list all spaces in librato
librato-cli space list

#get definition for space 65408
librato-cli space get 65408

#list all metrics
librato-cli metric list

#list metrics that match the 'foo.bar' filter pattern
librato-cli metric list foo.bar

#get measures from 4 hours ago for a metric
librato-cli-metric-get foo.bar 14400

#update metric named 'foo.bar', setting its summarize function to use summation
librato-cli attr foo.bar summarize_function=sum

#export the definition of an existing chart to a file
librato-cli chart export 65408 591000 > test.json

#import that chart definition to a different space
librato-cli chart import 65409 "$(cat test.json)"

#export the definition of an entire space (including all of its charts) to a file
librato-cli space export 65408 > test.json

#import that space definition as a brand new space
librato-cli space import "$(cat test.json)"
```

## Legal ##

_librato-cli_ is made available as-is under _The MIT License_. See the LICENSE file for full license details.
