# Changelog

## 1.2.1

* Updated to transforming empty subtitle returns empty string instead of throwing error.

## 1.2.0

* Use milliseconds to handle time data more flexibly.
* Changed each property names of each subtitles. (`start -> startTime`, `end -> endTime`, `subtitles -> texts`)
* Changed type of `texts (subtitles previously)` to string[] from string.

## 1.1.3

* Fixed type declaration file.

## 1.1.2

* Fixed type declaration to be able to access subtitles property.

## 1.1.1

* Use export default instead of export = in type declaration.

## 1.1.0

* Added Typescript module declaration.

## 1.0.0

* Initial release.