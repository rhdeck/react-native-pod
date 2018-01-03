# react-native-pod

Extends support for CocoaPods in React Native projects by:

1. Initializing a Podfile for your ios project (in /ios/Podfile)
2. On react-native link, scans the package.json of all dependencies for a "pods" entry. If found, adds those pods to the Podfile.
3. At the end of react-native link, runs `pod install` to update your Pods if necessary. Now you have installed pods!
4. You can update pods at any time by running `react-native installpods`

# Usage:

```bash
yarn add react-native-pod
react-native link
```

# Developer use

**New!** Add pods you would like distributed with your package from the command line:

```
react-native addpod [pod]
```

or

```
react-native addpod [pod] --podversion [version]
```

or

```
react-native addpod [pod] --podgit[giturl]
```

Note that adding a pod puts the reference in your package.json. This gives the hint to react-native link to add it to your Podfile.

To remove a pod:

```
react-native removepod [pod]
```

# Prerequisite

You need to have [CocoaPods](http://cocoapods.org) installed. To get it going: `sudo gem install cocoapods`.

# How to add value with this

When making a native module that has a pod dependency, just add the pod reference to your pods in package.json manually or using the tools above, and make `react-native-pod` a peer dependency.

Feedback welcome!
