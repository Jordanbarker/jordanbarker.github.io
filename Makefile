TEMPLATE = _src/pandoc_template.html
SRC_DIR = _src
OUT_DIR = projects

POSTS = $(basename $(notdir $(wildcard $(SRC_DIR)/*.md)))

all: $(POSTS:%=$(OUT_DIR)/%.html)

$(OUT_DIR)/%.html: $(SRC_DIR)/%.md $(TEMPLATE)
	pandoc $< -o $@ -s --section-divs --toc --toc-depth=2 --template=$(TEMPLATE) --mathjax

clean:
	rm -f $(POSTS:%=$(OUT_DIR)/%.html)

.PHONY: all clean
