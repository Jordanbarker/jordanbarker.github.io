import subprocess

# List of notebook files
notebooks = [
    "Evaluation_Metrics.ipynb", 
    "StatisticalTests.ipynb",
    "TimeSeries.ipynb",
    "Distributions.ipynb"
]
# Output directory should be one level up.
output_dir = "../"
# output_dir = "/"

# Loop through the list and convert each notebook
for nb in notebooks:
    command = ["jupyter", "nbconvert", "--to", "html", 
            #    f'Jupyter_notebooks/{nb}', "--template", "classic",
               f'{nb}', "--template", "classic",
               "--output-dir", output_dir]
    subprocess.run(command)