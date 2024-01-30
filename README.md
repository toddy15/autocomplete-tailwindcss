# autocomplete-tailwindcss

Autocomplete for Tailwind CSS classes.

## Installation

You can install the package from the Pulsar GUI, using the Pulsar Package
Manager [ppm](https://github.com/pulsar-edit/ppm). Another option is the
installation from the command line.

```shell
ppm install autocomplete-tailwindcss
```

## Contributing

Pull requests are welcome. Please make sure to update tests as appropriate.

## Authors and copyright

- Dr. Tobias Quathamer <toddy@debian.org>
- Ray Brown <hey@raybrown.co>
- Vincent Klaiber <hello@doubledip.se>

## License

[MIT](LICENSE.md)

## Creating a new release

The following process should be followed to create a new release of this
package. (I'm writing these words just as much for myself as I am for anyone
interested in sending a PR.)

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

If nothing has failed and the inspection goes well enough, you're ready to
create a new version! All this means is that you crack open `package.json` and
bump the version number. After that's done, send a pull request!

## History

This package uses the great work of
[raybrownco/atom-tailwindcss](https://github.com/raybrownco/atom-tailwindcss)
and vinkla/autocomplete-tailwind (which is no longer available on GitHub).
Unfortunately, both projects are no longer actively developed.
