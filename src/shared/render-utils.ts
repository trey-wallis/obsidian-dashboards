import { MarkdownRenderer, WorkspaceLeaf } from "obsidian";
import DashboardsView from "src/obsidian/dashboards-view";

export const appendOrReplaceFirstChild = (
	container: HTMLElement | null,
	child: HTMLElement | null
) => {
	if (container == null || child === null) return;

	//If there is no first child, append the child
	if (container && !container.firstChild) {
		container.appendChild(child);
		//If there is already a child and it is not the same as the child, replace the child
	} else if (container.firstChild && container.firstChild !== child) {
		container.replaceChild(child, container.firstChild);
	}
};

export const renderMarkdown = async (leaf: WorkspaceLeaf, markdown: string) => {
	const div = document.createElement("div");
	div.style.height = "100%";
	div.style.width = "100%";
	div.classList.add("markdown-rendered");

	const view = leaf.view;
	if (view instanceof DashboardsView) {
		try {
			await MarkdownRenderer.renderMarkdown(
				markdown,
				div,
				view.file.path,
				view
			);
		} catch (e) {
			console.error(e);
		}
	}
	return div;
};
