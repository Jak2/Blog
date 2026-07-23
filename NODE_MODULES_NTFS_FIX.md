# npm install fails with esbuild EACCES — NTFS root cause

## Symptom
```
npm error Error: spawnSync .../node_modules/esbuild/bin/esbuild EACCES
```
during `npm i` / `npm run build`.

## Root cause
This project lives on `/media/asterisk/windows_drive` (NTFS, mounted as `fuseblk`).
That filesystem doesn't support real Unix exec permission bits, so binaries
esbuild/sharp install into `node_modules` (via postinstall hardlink/download)
never get a working exec bit — `EACCES` on every invocation, even after `chmod +x`.

## Fix
`node_modules` is a symlink to a directory on the native ext4 filesystem:

```
node_modules -> /home/asterisk/.local/share/node_modules-stores/Blog/node_modules
```

Important: the real directory must literally be **named** `node_modules`
(nested one level, e.g. `.../Blog/node_modules`, not `.../Blog` itself) —
Node's ESM resolver walks up ancestor directories looking for a folder
named `node_modules`; if the real (post-symlink) directory has any other
name, package resolution breaks (`ERR_MODULE_NOT_FOUND`) even though the
files are all present.

## IMPORTANT: never run `npm i` from the project directory
`npm`'s installer (arborist) detects that `node_modules` is a symlink,
deletes it, and recreates a real directory in its place **on the NTFS
mount** — silently undoing this fix and bringing back the EACCES errors.
You'll see this telltale warning when it happens:
```
npm warn reify Removing non-directory .../Blog/node_modules
```

Always install/update dependencies from the ext4 store directory instead,
then the project's symlink picks up the result automatically:

```bash
# whenever package.json changes and you need to (re)install:
cp package.json package-lock.json /home/asterisk/.local/share/node_modules-stores/Blog/
cd /home/asterisk/.local/share/node_modules-stores/Blog
npm i
cd -   # back to the project
```

## Re-creating this setup from scratch
```bash
mkdir -p /home/asterisk/.local/share/node_modules-stores/Blog
cp package.json package-lock.json /home/asterisk/.local/share/node_modules-stores/Blog/
cd /home/asterisk/.local/share/node_modules-stores/Blog && npm i && cd -
ln -sfn /home/asterisk/.local/share/node_modules-stores/Blog/node_modules node_modules
```

## If npm ever complains about "packages have install scripts not yet covered by allowScripts"
This is npm 11's script-approval gate. Run once:
```bash
npm approve-scripts esbuild
npm approve-scripts sharp
```
This writes an `allowScripts` block into `package.json` — keep it committed.
