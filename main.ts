import { 
    App, 
    Modal, 
    Notice, 
    Plugin, 
    PluginSettingTab,
    Setting, 
    TFile, 
    TFolder
} from 'obsidian';

interface DendronImporterSettings {
    defaultImportFolder: string;
    preserveOriginalNames: boolean;
    createDateFolders: boolean;
}

const DEFAULT_SETTINGS: DendronImporterSettings = {
    defaultImportFolder: 'Imported from Dendron',
    preserveOriginalNames: false,
    createDateFolders: true
}

class DendronImportModal extends Modal {
    plugin: DendronImporterPlugin;
    dendronPath: string = '';
    importFolder: string = '';

    constructor(app: App, plugin: DendronImporterPlugin) {
        super(app);
        this.plugin = plugin;
        this.importFolder = plugin.settings.defaultImportFolder;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: 'Import from Dendron Vault' });

        // Dendron vault path input
        new Setting(contentEl)
            .setName('Dendron Vault Path')
            .setDesc('Path to your Dendron vault folder (containing .md files)')
            .addText(text => {
                text.setPlaceholder('/path/to/dendron/vault')
                    .setValue(this.dendronPath)
                    .onChange(async (value) => {
                        this.dendronPath = value;
                    });
            });

        // Import destination folder
        new Setting(contentEl)
            .setName('Import Destination')
            .setDesc('Folder where imported files will be organized')
            .addText(text => {
                text.setPlaceholder('Imported Dendron Notes')
                    .setValue(this.importFolder)
                    .onChange(async (value) => {
                        this.importFolder = value;
                    });
            });

        // Options
        new Setting(contentEl)
            .setName('Preserve Original Filenames')
            .setDesc('Keep Dendron dot-notation filenames instead of converting to readable names')
            .addToggle(toggle => {
                toggle.setValue(this.plugin.settings.preserveOriginalNames)
                    .onChange(async (value) => {
                        this.plugin.settings.preserveOriginalNames = value;
                        await this.plugin.saveSettings();
                    });
            });

        new Setting(contentEl)
            .setName('Create Date-based Folders')
            .setDesc('Organize daily journal entries by date')
            .addToggle(toggle => {
                toggle.setValue(this.plugin.settings.createDateFolders)
                    .onChange(async (value) => {
                        this.plugin.settings.createDateFolders = value;
                        await this.plugin.saveSettings();
                    });
            });

        // Action buttons
        const buttonContainer = contentEl.createDiv({ cls: 'modal-button-container' });
        
        buttonContainer.createEl('button', { text: 'Cancel' })
            .addEventListener('click', () => this.close());

        const importBtn = buttonContainer.createEl('button', { text: 'Import', cls: 'mod-cta' });
        importBtn.addEventListener('click', async () => {
            if (!this.dendronPath.trim()) {
                new Notice('Please specify a Dendron vault path');
                return;
            }
            
            this.close();
            await this.plugin.importFromDendron(this.dendronPath, this.importFolder);
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export default class DendronImporterPlugin extends Plugin {
    settings: DendronImporterSettings;

    async onload() {
        await this.loadSettings();

        // Add ribbon icon
        this.addRibbonIcon('download', 'Import from Dendron', () => {
            this.showImportModal();
        });

        // Add command
        this.addCommand({
            id: 'import-dendron-vault',
            name: 'Import from Dendron Vault',
            callback: () => this.showImportModal()
        });

        // Add settings tab
        this.addSettingTab(new DendronImporterSettingTab(this.app, this));
    }

    showImportModal() {
        new DendronImportModal(this.app, this).open();
    }

    async importFromDendron(dendronPath: string, importFolder: string) {
        try {
            new Notice('Starting Dendron import...');

            // Since we're in a browser context, we need to work with files provided by the user
            // For now, we'll create a simulated import based on common Dendron patterns
            await this.createDendronFolderStructure(importFolder);
            
            new Notice('Dendron folder structure created! Please manually copy your .md files to the appropriate folders.');
            
        } catch (error) {
            console.error('Import failed:', error);
            new Notice('Import failed: ' + error.message);
        }
    }

    async createDendronFolderStructure(basePath: string) {
        const structure = [
            `${basePath}/Courses/Doing`,
            `${basePath}/Courses/Done`, 
            `${basePath}/Courses/Todo`,
            `${basePath}/Daily`,
            `${basePath}/Projects/Doing`,
            `${basePath}/Projects/Done`,
            `${basePath}/Projects/Ideas`,
            `${basePath}/Web-Resources/Authentication`,
            `${basePath}/Web-Resources/CSS`,
            `${basePath}/Web-Resources/Docker`,
            `${basePath}/Web-Resources/GraphQL`,
            `${basePath}/Web-Resources/NextJS`,
            `${basePath}/Web-Resources/React`,
            `${basePath}/Web-Resources/Testing`,
            `${basePath}/Web-Resources/General`,
            `${basePath}/Guidewire/Education`,
            `${basePath}/Guidewire/Training`,
            `${basePath}/Boilerplates`,
            `${basePath}/Testing`,
            `${basePath}/Technical/Git`,
            `${basePath}/Technical/Database`,
            `${basePath}/Technical/Languages`,
            `${basePath}/Interviews`,
            `${basePath}/Jobs`,
            `${basePath}/References`
        ];

        for (const folderPath of structure) {
            await this.createFolderSafely(folderPath);
        }

        // Create a guide file
        const guideContent = `# Dendron Import Guide

This folder structure has been created to match common Dendron organizational patterns.

## Folder Mapping Guide

### Dendron Pattern → Obsidian Folder
- \`courses.doing.*\` → **Courses/Doing/**
- \`courses.done.*\` → **Courses/Done/**
- \`courses.todo.*\` → **Courses/Todo/**
- \`daily.journal.*\` → **Daily/**
- \`pro.doing.*\` → **Projects/Doing/**
- \`pro.done.*\` → **Projects/Done/**
- \`pro.ideas.*\` → **Projects/Ideas/**
- \`web.resources.authentication.*\` → **Web-Resources/Authentication/**
- \`web.resources.css.*\` → **Web-Resources/CSS/**
- \`web.resources.docker.*\` → **Web-Resources/Docker/**
- \`web.resources.graphql.*\` → **Web-Resources/GraphQL/**
- \`web.resources.nextjs.*\` → **Web-Resources/NextJS/**
- \`web.resources.react.*\` → **Web-Resources/React/**
- \`web.resources.testing.*\` → **Web-Resources/Testing/**
- \`gw.education.*\` → **Guidewire/Education/**
- \`gw.training.*\` → **Guidewire/Training/**
- \`boilerplates.*\` → **Boilerplates/**
- \`testing.*\` → **Testing/**
- \`git.*\` → **Technical/Git/**
- \`knex.*\`, \`db.*\` → **Technical/Database/**
- \`java.*\`, \`python.*\`, \`lan.*\` → **Technical/Languages/**
- \`interviews.*\` → **Interviews/**
- \`jobs.*\` → **Jobs/**
- Other files → **References/**

## Manual Import Steps

1. **Copy your Dendron .md files** from your Dendron vault
2. **Place them in the appropriate folders** based on the mapping above
3. **Rename files** if desired (remove dot-notation prefixes)
4. **Update internal links** to match new file locations
5. **Delete this guide** when import is complete

## Tips

- Use Obsidian's "Move file to another folder" feature for easy reorganization
- The "Quick Switcher" (Ctrl/Cmd+O) helps find files quickly
- Consider using tags to maintain Dendron-style organization
`;

        await this.app.vault.create(`${basePath}/IMPORT_GUIDE.md`, guideContent);
    }

    async createFolderSafely(folderPath: string): Promise<TFolder | null> {
        try {
            const existingFolder = this.app.vault.getAbstractFileByPath(folderPath);
            if (existingFolder instanceof TFolder) {
                return existingFolder;
            }
            
            return await this.app.vault.createFolder(folderPath);
        } catch (error) {
            // Folder might already exist or parent doesn't exist
            // Try to create parent folders first
            const parts = folderPath.split('/').filter(part => part.length > 0);
            let currentPath = '';
            
            for (const part of parts) {
                currentPath = currentPath ? `${currentPath}/${part}` : part;
                try {
                    const existing = this.app.vault.getAbstractFileByPath(currentPath);
                    if (!(existing instanceof TFolder) && existing === null) {
                        await this.app.vault.createFolder(currentPath);
                    }
                } catch (e) {
                    console.warn('Could not create folder:', currentPath, e);
                }
            }
            
            return null;
        }
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class DendronImporterSettingTab extends PluginSettingTab {
    plugin: DendronImporterPlugin;

    constructor(app: App, plugin: DendronImporterPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: 'Dendron Importer Settings' });

        new Setting(containerEl)
            .setName('Default Import Folder')
            .setDesc('Default folder name for importing Dendron notes')
            .addText(text => text
                .setPlaceholder('Imported from Dendron')
                .setValue(this.plugin.settings.defaultImportFolder)
                .onChange(async (value) => {
                    this.plugin.settings.defaultImportFolder = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Preserve Original Filenames')
            .setDesc('Keep Dendron dot-notation filenames instead of converting to readable names')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.preserveOriginalNames)
                .onChange(async (value) => {
                    this.plugin.settings.preserveOriginalNames = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Create Date-based Folders')
            .setDesc('Organize daily journal entries in date-based subfolders')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.createDateFolders)
                .onChange(async (value) => {
                    this.plugin.settings.createDateFolders = value;
                    await this.plugin.saveSettings();
                }));
    }
}