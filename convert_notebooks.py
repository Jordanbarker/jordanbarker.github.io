import subprocess

# List of notebook files
notebooks = [
    "Accuracy_Metrics.ipynb", 
    "StatisticalTests.ipynb"
]
# Output directory should be one level up.
output_dir = "../"

# Loop through the list and convert each notebook
for nb in notebooks:
    command = ["jupyter", "nbconvert", "--to", "html", 
               f'Jupyter_notebooks/{nb}', "--template", "classic", 
               "--output-dir", output_dir]
    subprocess.run(command)