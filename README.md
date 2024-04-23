# About
Creating a website to store some of my commonly referenced notes.

# Getting started
To convert ipynb to html I'm using a custom nbconvert template. I created a python script to convert all notebook files:
* python convert_notebooks.py

Or manually run the line in terminal:
* jupyter nbconvert --to html Distributions.ipynb --template classic

Was using custom_classic but this is going to take some work to cleanup
* jupyter nbconvert --to html Distributions.ipynb --template custom_classic

Test locally with: 'live-server' or 'python -m http.server 8000'

# Future ideas
* Notebook on Clustering
* Notebook on Statistical Tests
* Increase performance by only loading in the required icons https://fontawesome.com/docs/web/dig-deeper/performance
* Finish CNN Classifier
