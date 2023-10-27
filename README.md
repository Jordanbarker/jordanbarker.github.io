Test locally with: 'live-server' or 'python -m http.server 8000'

To convert ipynb to html I'm using a custom nbconvert template.
  jupyter nbconvert --to html Distributions.ipynb --template custom_classic