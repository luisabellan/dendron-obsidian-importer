# Dendron Obsidian Importer

A plugin for Obsidian that helps you import your notes from Dendron vault with automatic folder structure conversion from dot-notation hierarchy to traditional folder organization.

## Features

- 🗂️ **Automatic Folder Structure Creation** - Converts Dendron's dot-notation to organized folders
- 📝 **Intelligent File Organization** - Maps common Dendron patterns to logical folder hierarchies
- ⚙️ **Configurable Import Options** - Customize how files are imported and organized
- 📋 **Import Guide Generation** - Creates a helpful guide for manual file organization
- 🔄 **Preserve Original Names** - Option to keep original Dendron filenames

## Installation

### Manual Installation

1. Download the latest release from the [releases page](https://github.com/luisabellan/dendron-obsidian-importer/releases)
2. Extract the plugin files to your vault's plugins folder:
   ```
   VaultFolder/.obsidian/plugins/dendron-obsidian-importer/
   ```
3. Reload Obsidian and enable the plugin in Settings > Community Plugins

### From Obsidian Community Plugins

*Coming soon - pending approval*

## Usage

### Quick Start

1. **Open the Import Dialog**
   - Click the download icon in the ribbon, OR
   - Use Command Palette: "Import from Dendron Vault"

2. **Configure Import Settings**  
   - Specify your Dendron vault path (folder containing .md files)
   - Choose destination folder in your Obsidian vault
   - Toggle import options as needed

3. **Run Import**
   - Click "Import" to create the folder structure
   - Follow the generated import guide for file organization

### Folder Structure Mapping

The plugin automatically maps Dendron's dot-notation patterns to organized folders:

| Dendron Pattern | Obsidian Folder |
|-----------------|-----------------|
| `courses.doing.*` | **Courses/Doing/** |
| `courses.done.*` | **Courses/Done/** |
| `courses.todo.*` | **Courses/Todo/** |
| `daily.journal.*` | **Daily/** |
| `pro.doing.*` | **Projects/Doing/** |
| `pro.done.*` | **Projects/Done/** |
| `pro.ideas.*` | **Projects/Ideas/** |
| `web.resources.authentication.*` | **Web-Resources/Authentication/** |
| `web.resources.css.*` | **Web-Resources/CSS/** |
| `web.resources.react.*` | **Web-Resources/React/** |
| `gw.education.*` | **Guidewire/Education/** |
| `boilerplates.*` | **Boilerplates/** |
| `testing.*` | **Testing/** |
| `git.*` | **Technical/Git/** |
| `interviews.*` | **Interviews/** |
| `jobs.*` | **Jobs/** |
| Other files | **References/** |

### Import Process

1. **Folder Structure Creation** - Plugin creates organized folder hierarchy
2. **Import Guide Generation** - Detailed guide with mapping instructions  
3. **Manual File Copy** - Copy your .md files to appropriate folders
4. **Link Updates** - Update internal links to match new locations

## Settings

Access plugin settings via **Settings > Dendron Importer**:

- **Default Import Folder** - Base folder name for imports
- **Preserve Original Filenames** - Keep dot-notation names vs readable names
- **Create Date-based Folders** - Organize daily entries by date

## Examples

### Before (Dendron)
```
vault/
├── courses.doing.react.md
├── daily.journal.2023.01.15.md
├── pro.doing.website-redesign.md
├── web.resources.css.flexbox-guide.md
└── git.commands.cheatsheet.md
```

### After (Obsidian)
```
Imported from Dendron/
├── Courses/
│   └── Doing/
│       └── courses.doing.react.md
├── Daily/
│   └── daily.journal.2023.01.15.md
├── Projects/
│   └── Doing/
│       └── pro.doing.website-redesign.md
├── Web-Resources/
│   └── CSS/
│       └── web.resources.css.flexbox-guide.md
└── Technical/
    └── Git/
        └── git.commands.cheatsheet.md
```

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/luisabellan/dendron-obsidian-importer.git
cd dendron-obsidian-importer

# Install dependencies
npm install

# Start development mode
npm run dev
```

### Building

```bash
# Build for production
npm run build
```

### Project Structure

```
dendron-obsidian-importer/
├── main.ts              # Main plugin code
├── manifest.json        # Plugin metadata
├── styles.css          # Plugin styles
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── esbuild.config.mjs  # Build configuration
└── versions.json       # Version history
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Roadmap

- [ ] **File Content Analysis** - Automatically categorize uncategorized files
- [ ] **Link Update Automation** - Automatically update internal links
- [ ] **Batch Import** - Import multiple Dendron vaults
- [ ] **Custom Mapping Rules** - User-defined folder mapping patterns
- [ ] **Asset Import** - Handle images and attachments
- [ ] **Tag Preservation** - Convert Dendron tags to Obsidian tags

## Troubleshooting

### Common Issues

**Q: Import button doesn't work**
A: Ensure you've specified a valid Dendron vault path containing .md files

**Q: Folders aren't created**
A: Check Obsidian permissions and ensure the destination folder name is valid

**Q: Files aren't in the right folders**
A: Review the import guide and mapping table - some manual organization may be needed

**Q: Plugin doesn't appear**
A: Restart Obsidian and ensure the plugin is enabled in Community Plugins

### Getting Help

- 📝 [Create an issue](https://github.com/luisabellan/dendron-obsidian-importer/issues)
- 💬 [Discussions](https://github.com/luisabellan/dendron-obsidian-importer/discussions)

## License

MIT License - see [LICENSE](LICENSE) file for details

## Acknowledgments

- Thanks to the [Dendron](https://dendron.so) team for creating an amazing PKM system
- Thanks to the [Obsidian](https://obsidian.md) community for plugin development resources
- Inspired by the need to migrate between excellent note-taking systems

---

**Made with ❤️ for the PKM community**