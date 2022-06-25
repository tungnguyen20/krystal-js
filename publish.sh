#!/bin/bash

RELEASES_TAG_PATTERN="^releases\/(.+)\/(.+)$"

PACKAGE_NAME_GROUP=1
RELEASE_VERSION_GROUP=2

if [[ $1 =~ $RELEASES_TAG_PATTERN ]]; then
  package_name="${BASH_REMATCH[PACKAGE_NAME_GROUP]}"
  release_version="${BASH_REMATCH[RELEASE_VERSION_GROUP]}"

#   PACKAGE_VERSION=$(yarn --silent workspace "$package_name" --silent node -e "console.log(require('./package.json').version)")

    
    # echo "$PACKAGE_VERSION"

#   if [ "$release_version" != "$PACKAGE_VERSION" ]; then
#     echo "Publish version missmatch"
#     exit 1
#   fi

  echo "Publish version $release_version of $package_name"

  yarn build
  yarn workspace "$package_name" npm publish --access public
else
  printf "This tag is not a release tag!!!"
  exit 1
fi
