# Data Science Cookbook
This website hosts my commonly referenced notes on data science, machine learning, Python, and more.

## Cookbook details
The data science cookbook is created using [Jupyter Book](https://jupyterbook.org/en/stable/intro.html).

There is an environment file to create a conda environment with all the necessary libraries:
> conda env create --file environment.yml

Pages are build with this command:
> jupyter-book build notebook_library/ --path-output docs

Use the `--all` modifier when creating a new page so that the other pages reference it in the TOC.
> jupyter-book build --all notebook_library/ --path-output docs