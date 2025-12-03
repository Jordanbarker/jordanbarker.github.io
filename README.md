# About
This website hosts my commonly referenced notes on data science and machine learning as well as some personal projects.

## Cookbook details
The data science cookbook is created using [Jupyter Book](https://jupyterbook.org/en/stable/intro.html).

There is an environment file to create a conda environment with all the necessary libraries:
> conda env create --file environment.yml

Pages are build with this command:
> jupyter-book build notebook_library/

Use the `--all` modifier when creating a new page so that the other pages reference it in the TOC.
> jupyter-book build --all notebook_library/


### nbconvert (old method) 
Before learning about Jupyter Book, this was done using nbconvert. Here are the original steps:

To convert ipynb to html I'm using a custom nbconvert template. I created a python script to convert all notebook files:
* python convert_notebooks.py

Or manually run the line in terminal:
* jupyter nbconvert --to html Distributions.ipynb --template classic

Was using custom_classic but this is going to take some work to cleanup
* jupyter nbconvert --to html Distributions.ipynb --template custom_classic

Test locally with: 'live-server' or 'python -m http.server 8000'

## Pandoc Build

```bash
pandoc marathon.md -o marathon.html -s --section-divs --toc --toc-depth=2 --template=pandoc_template.html
```

## Future ideas
* Bayesian inference using [groundhog-day](https://groundhog-day.com/) data.
* Integrate [Plausible Analytics](https://jupyterbook.org/en/stable/advanced/html.html#use-plausible-analytics).