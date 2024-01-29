# autocomplete-tailwindcss

## Introduction

This package uses the great work of [raybrownco/atom-tailwindcss](https://github.com/raybrownco/atom-tailwindcss) and [vinkla/autocomplete-tailwind](https://github.com/vinkla/autocomplete-tailwind). Unfortunately, both projects are stuck at Tailwind CSS v1 and there does not seem to be any activity in both repositories.

This project is updated to include the classnames of Tailwind CSS v3.4 and has been fixed to show a preview of the color names.

## Manually Installing this Atom Package

```shell
git clone https://github.com/toddy15/autocomplete-tailwindcss.git
cd autocomplete-tailwindcss
npm install
npm run build
apm install
apm link .
```

## Creating a New Release

The following process should be followed to create a new release of this package. (I'm writing these words just as much for myself as I am for anyone interested in sending a PR.)

```shell
# If the project's not set up yet:
git clone https://github.com/toddy15/autocomplete-tailwindcss.git
cd autocomplete-tailwindcss
npm install

# Grab the latest version of Tailwind CSS
npm update tailwindcss

# Run a script to update the `src/completions.json` file
npm run build

# Run tests to make sure the update hasn't broken anything
npm run test

# Perform a manual visual inspection of the completions
git diff src/completions.json
```

If nothing has failed and the inspection goes well enough, you're ready to create a new version! All this means is that you crack open `package.json` and bump the version number. After that's done, send a pull request!

[MIT](LICENSE.md) © Dr. Tobias Quathamer
