<img align="right" width="140px" src="https://thaldrin.media/avatar.png">

# Thaldrin

![GitHub package.json version](https://img.shields.io/github/package-json/v/thaldrin/thaldrin?style=flat-square)

A utility furry bot for spicing up your Discord server.

### Requirements

- Supabase
- [sheri.bot](https://sheri.bot) API Key
- [thaldr.in](https://thaldr.in) API Key
- Docker

Thaldrin uses Supabase as his Database Backend, his Image and Roleplay Commands are powered by [sheri.bot](https://sheri.bot) and [thaldr.in](https://thaldr.in)

## Run Locally

run `npm run git:init`

`Lux` will error out for you, it's a private Repo after all, so you'll have to create some files manually.

```yml
# lux/cultum/config.yml

# (the cultum docker-compose step and modulus REQUIRE this file)
SUPABASE_URL:
SUPABASE_KEY:
CULTUM_URL: http://172.25.36.69
```

Once you've done that, you should be set to follow the commands below

```bash
npm run docker:build
npm run docker:up
```

## Contributors

- [@HimboLion](https://lion.himbo.cat) **-** Developer
- [@ThalLycal](https://twitter.com/ThalLycal) **-** OC Owner
- [@Cynosphere](https://github.com/Cynosphere) **-** Shortlink Code

## License

Thaldrin is released under [GNU GPLv3](/LICENSE)
