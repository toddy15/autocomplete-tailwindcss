# atom-tailwindcss

**NOTE:** This package is forked from [raybrownco/atom-tailwindcss](https://github.com/raybrownco/atom-tailwindcss), because there are no longer updates to the new Tailwind CSS class names.

That package had been forked from [vinkla/autocomplete-tailwind](https://github.com/vinkla/autocomplete-tailwind), where it has been archived and abandoned by the previous owner.

The project is now in a state of maintenance; there is no active development. If you're here because you are using this project but the completions list is not up to date, feel free to make a pull request!

## Manually Installing this Atom Package

```shell
git clone https://github.com/toddy15/tailwindcss-autocomplete.git
cd tailwindcss-autocomplete
npm install
npm run build
apm install
apm link .
```

## Creating a New Release

The following process should be followed to create a new release of this package. (I'm writing these words just as much for myself as I am for anyone interested in sending a PR.)

```shell
# If the project's not set up yet:
git clone https://github.com/toddy15/tailwindcss-autocomplete.git
cd tailwindcss-autocomplete
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

[MIT](LICENSE) © Dr. Tobias Quathamer
