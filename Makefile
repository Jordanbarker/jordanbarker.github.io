TEMPLATE = _src/pandoc_template.html
SRC_DIR = _src
OUT_DIR = projects

POSTS = $(basename $(notdir $(wildcard $(SRC_DIR)/*.md)))

all: $(POSTS:%=$(OUT_DIR)/%.html) $(POSTS:%=$(OUT_DIR)/%.html.md)

$(OUT_DIR)/%.html: $(SRC_DIR)/%.md $(TEMPLATE)
	pandoc $< -o $@ -s --section-divs --toc --toc-depth=2 --template=$(TEMPLATE) --mathjax

# Plain Markdown copies for LLMs (see llms.txt)
$(OUT_DIR)/%.html.md: $(SRC_DIR)/%.md
	cp $< $@

clean:
	rm -f $(POSTS:%=$(OUT_DIR)/%.html) $(POSTS:%=$(OUT_DIR)/%.html.md)

.PHONY: all clean
