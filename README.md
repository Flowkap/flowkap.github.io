<div align="center">
  <br>
  <img src="/images/flowkap.png" alt="Flowkap" width="200"/>
  <br>
  <p align="center">
    <i>Spend me a coffee if we ever meet and you like to :)</i>
  </p>
</div>

---

## About

This blog is based upton [Reverie](https://github.com/amitmerchant1990/reverie) and
hence [Jekyll](https://jekyllrb.com/)-powered.

To visit click [here](https://flowkap.dev/)!

If you want to try it / fork it either follow the docs under the originally forked repo or:

```
# you need ruby and jekyll installed!
# https://jekyllrb.com/docs/installation/
bundle install
bundle exec jekyll server --watch
```

Note: This project uses the github-pages gem to ensure compatibility with GitHub Pages.

Or push to your own github pages repo.

## Setup rbenv and Install Ruby on macOS

1. **Install rbenv and ruby-build with Homebrew:**
   ```bash
   brew install rbenv ruby-build
   ```

2. **Initialize rbenv in your shell:**
    * For Zsh (default): `echo 'eval "$(rbenv init -)"' >> ~/.zshrc`
    * For Bash: `echo 'eval "$(rbenv init -)"' >> ~/.bash_profile`

   Afterward, **restart your terminal** for the changes to take effect.

3. **Install and set your desired Ruby version:**
   ```bash
   # Install a specific version (e.g., 3.2.2)
   rbenv install 3.2.2
   
   # Set it as the default version
   rbenv global 3.2.2
   ```
   For a project-specific version, navigate to your project's folder and use `rbenv local 3.2.2` instead.

4. **Verify the installation:**
   Check that the correct Ruby version is now active.
   ```bash
   ruby -v
   ```

## License

MIT
