#!/usr/bin/env bash
echo "Updating live files..."
gcloud config set project unixtimestamp
gsutil -h "Cache-Control:public, max-age=86400" -m cp -r -Z dist/* gs://unixtime.ninja/