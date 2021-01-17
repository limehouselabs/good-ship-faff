# The Good Ship Faff

Limehouse Labs' attempt at making a submarine that sinks less. (NOTE: It still sinks)

## Packing and unpacking files

To pack an XML file to .sub:

```shell
$ ./pack.js Submarines/MySub.xml /c/Steam/SteamApps/common/Barotrauma/Submarines
```

Alternatively, set the `BAROTRAUMA_SUB_DIRECTORY` environment variable:

```shell
$ export BAROTRAUMA_SUB_DIRECTORY='/c/Steam/SteamApps/common/Barotrauma/Submarines'

# packs ./Submarines/MySub.xml to /c/Steam/.../Submarines/MySub.xml
$ ./pack.js Submarines/MySub.xml
```

To extract a submarine file back to this directory:

```shell
$ ./pack.js /c/Steam/SteamApps/common/Barotrauma/Submarines/MySub.sub ./Submarines
```

If the `BAROTRAUMA_SUB_DIRECTORY` is set, you can pass the filename as a relative path:

```shell
$ export BAROTRAUMA_SUB_DIRECTORY='/c/Steam/SteamApps/common/Barotrauma/Submarines'

# packs /c/Steam/.../Submarines/MySub.sub to ./Submarines/MySub.xml
$ ./pack.js MySub.sub Submarines
```
