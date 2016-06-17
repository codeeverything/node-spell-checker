# NodeJS Spell Checker

Uses [BK Trees](https://en.wikipedia.org/wiki/BK-tree) and [Levenstein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance) to provide spelling correction suggestions via a simple API.

Originally inspired by [Peter Norvig's essay on spell checking](http://norvig.com/spell-correct.html), and the references therein.

## Usage

Run ```server.js```:

```
$ node server.js
```

Navigate to the API endpoint ```/api/:word```, for example:

```/api/speling```, and you'll be returned an array of possible corrections:

```
[
  "spelling",
  "dueling",
  "peking",
  "seeing",
  "sewing",
  "spring",
  "spying",
  "splint",
  "piling"
]
```


## Generating the dictionary

A default dictionary file is provided in ```data/dic.json```, but you can run ```node gendic.js``` if you want to generate your own. Simply change this line ```var files = ['big.txt'];``` so that the array contains your own source text file (should be the only entry).