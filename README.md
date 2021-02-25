# BioLink Model

A nodejs library for manipulating BioLink Model.

[![Test Coveralls](https://github.com/kevinxin90/biolink-model.js/actions/workflows/coverage.yml/badge.svg)](https://github.com/kevinxin90/biolink-model.js/actions/workflows/coverage.yml)
[![Coverage Status](https://coveralls.io/repos/github/kevinxin90/biolink-model.js/badge.svg?branch=main)](https://coveralls.io/github/kevinxin90/biolink-model.js?branch=main)

## 💾 Install

```bash
npm i biolink-model
```

## 📐 Usage

### 🔎 Get BioLink Class Tree Object

```javascript
const bl = require("biolink-model")

const biolink = new bl.BioLink();

await biolink.load();

const tree = biolink.classTree;
```

### 🔎 Get the ancestors of a biolink class

```javascript
const bl = require("biolink-model")

const biolink = new bl.BioLink();

await biolink.load();

const tree = biolink.classTree;

const ancestors = tree.getAncestors("Gene")
```

### 🔎 Get the descendants of a biolink class

```javascript
const bl = require("biolink-model")

const biolink = new bl.BioLink();

await biolink.load();

const tree = biolink.classTree;

const descendants = tree.getDescendants("MolecularEntity")
```
