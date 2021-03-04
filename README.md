# BioLink Model

A nodejs library for manipulating BioLink Model.

[![Test Coveralls](https://github.com/kevinxin90/biolink-model.js/actions/workflows/coverage.yml/badge.svg)](https://github.com/kevinxin90/biolink-model.js/actions/workflows/coverage.yml)
[![Coverage Status](https://coveralls.io/repos/github/kevinxin90/biolink-model.js/badge.svg?branch=main)](https://coveralls.io/github/kevinxin90/biolink-model.js?branch=main)

## 💾 Install

```bash
npm i biolink-model
```

## 📐 Usage

### Import and Initialize

```javascript
const bl = require("biolink-model")

const biolink = new bl.BioLink();

```

### Load BioLink Yaml File

Loading BioLink Yaml file is a required step before you can utilizing this package to traverse the hierarchy tree for BioLink predicates and classes.

The Yaml file can be loaded through a url, a local file stored within the package, or a valid file path provided.

#### 🔎 Load the BioLink-model yaml file stored along with the package

This can be done in sync or async mode.

```javascript
// load in async mode
await biolink.load();
// in sync mode
biolink.loadSync();
```

#### 🔎 Load the BioLink-model yaml file from a valid url

```javascript
// load in async mode
/// the url provided below points to the most recent version of the biolink model.
await biolink.load("https://raw.githubusercontent.com/biolink/biolink-model/master/biolink-model.yaml");
```

#### 🔎 Load the BioLink-model yaml file from a local file path

This can be done in sync or async mode as well.

```javascript
import path from 'path';
// load in async mode
// assume your biolink file is stored in the same folder under biolink.yaml
await biolink.load(path.resolve(__dirname, './data/biolink.yaml');
// in sync mode
biolink.loadSync(path.resolve(__dirname, './data/biolink.yaml');
```

### 🔎 Get BioLink Class Tree Object

```javascript
const tree = biolink.classTree;
```

### 🔎 Get the ancestors of a biolink class

```javascript

const tree = biolink.classTree;

const ancestors = tree.getAncestors("Gene")
```

### 🔎 Get the descendants of a biolink class

```javascript

const tree = biolink.classTree;

const descendants = tree.getDescendants("MolecularEntity")
```

### 🔎 Get BioLink Slot Tree Object

```javascript
const tree = biolink.slotTree;
```

### 🔎 Get the ancestors of a biolink slot

```javascript

const tree = biolink.slotTree;

const ancestors = tree.getAncestors("regulates")
```

### 🔎 Get the descendants of a biolink slot

```javascript

const tree = biolink.slotTree;

const descendants = tree.getDescendants("regulates")
```
