// GI
const Atk = imports.gi.Atk;
const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Clutter = imports.gi.Clutter;

// UI
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

// Other
const Lang = imports.lang;

class Item extends PopupMenu.PopupBaseMenuItem {
    constructor (app) {
        super();

				// Old
        // let box = new St.BoxLayout({
        //     name: 'applicationMenuBox',
        //     style_class: 'applications-menu-item-box'
        // });

				//

				let box = new St.BoxLayout({ style_class: 'applications-menu-item-box' });
        box.style=('width: 250px;');

        let iconBox = new St.Bin();
        iconBox.style=('width: 35px; height: 25px;');
        box.add(iconBox, {
            y_align: St.Align.MIDDLE,
            y_fill: false
        });

        let icon = new St.Icon({
            icon_name: "audio-card",
            style_class: "applications-menu-button-icon"
        });
        iconBox.child = icon;

        this._label = new St.Label({
            text: app,
            y_expand: true,
            y_align: Clutter.ActorAlign.CENTER
        });
        box.add_child(this._label);

				//

        this.actor.add_child(box);

        // let label = new St.Label({ text: app });
        // box.add(label);
    } 
}

class Category extends PopupMenu.PopupBaseMenuItem {

}

class Menu extends PopupMenu.PopupMenu {
    constructor (actor, alignment, side, button) {
        super (actor, alignment, side);
        this._button = button;
    }

    open (animate) {
        super.open(animate);
    }

    close (animate) {
        super.close(animate);
    }

    toggle () {
        if (this.isOpen) {
            this._button.selectCategory();
        } else {
            if (Main.overview.visible) {
                Main.overview.hide();
            }
        }

        super.toggle();
    }
}

class ExtraButton extends PanelMenu.Button {
		constructor (app, align) {
        super(align, null, false);

        this.actor.accessible_role = Atk.Role.LABEL;

        let box = new St.BoxLayout();
        box.style=('width: 25px;');

        let iconBox = new St.Bin();
        iconBox.style=('width: 25px; height: 25px;');
        box.add(iconBox, {
            y_align: St.Align.MIDDLE,
            y_fill: false
        });

        let icon = new St.Icon({
            icon_name: app,
            style_class: "applications-menu-button-icon"
        });
        iconBox.child = icon;

        this.actor.add_actor(box);
        // this.actor.name = "hejsan";
		}
}

class Button extends PanelMenu.Button {
    constructor () {
        // menu alignment, text, dont create menu
        super(1.0, null, false);

        this.actor.accessible_role = Atk.Role.LABEL;

        let box = new St.BoxLayout();
        box.style=('width: 150px;');

        let iconBox = new St.Bin();
        iconBox.style=('width: 35px;');
        box.add(iconBox, {
            y_align: St.Align.MIDDLE,
            y_fill: false
        });

        let icon = new St.Icon({
            icon_name: "start-here",
            style_class: "applications-menu-button-icon"
        });
        iconBox.child = icon;

        this._label = new St.Label({
            text: "Applications",
            y_expand: true,
            y_align: Clutter.ActorAlign.CENTER
        });
        box.add_child(this._label);

        let filler2 = new St.Label({ text: " " });
        box.add(filler2, {
            y_align: St.Align.MIDDLE, 
            y_fill: false
        });

        box.add_child(PopupMenu.arrowIcon(St.Side.BOTTOM));

        this.actor.add_actor(box);
        this.actor.name = "panelApplications";
        this.actor.label_actor = this._label;

        this.buildMenu();
        this.actor.connect('button-release-event',
            Lang.bind(this, this.showMenu));
    }

    selectCategory () {

    }

    buildMenu () {
        let subMenu1 = new PopupMenu.PopupSubMenuMenuItem("Favoriter");
        this.menu.addMenuItem(subMenu1);

        let app1 = new Item("Terminal");
        let app2 = new Item("Google Chrome");
        let app3 = new Item("Atom");
        subMenu1.menu.addMenuItem(app1, 0);
        subMenu1.menu.addMenuItem(app2, 1);
        subMenu1.menu.addMenuItem(app3, 2);

        let subMenu2 = new PopupMenu.PopupSubMenuMenuItem("Programmering");
        this.menu.addMenuItem(subMenu2);

        let app4 = new Item("Visual Studio Code");
        let app5 = new Item("Inkscape");
        let app6 = new Item("Emacs");
        subMenu2.menu.addMenuItem(app4, 0);
        subMenu2.menu.addMenuItem(app5, 1);
        subMenu2.menu.addMenuItem(app6, 2);
    }

    showMenu (actor, event) {
        if (event.get_button() == 3) {
            let menu = new Menu(this.actor, 1.0, St.Side.TOP, this);
            menu.open();
            return true;
        }
        return false;
    }

    destroy () {
        super.destroy();
    }
}

class Extension {
    constructor () {
        this._indicator = null;
				this._extra = null;
        this._extra2 = null;
    }

    enable () {
        // Create panel button
        this._indicator = new Button();
				this._extra = new ExtraButton("input-gaming", 1.0);
        this._extra2 = new ExtraButton("input-mouse", 1.0);

        Main.panel.addToStatusArea("simpe-menu1", this._indicator, 5, "left");
				Main.panel.addToStatusArea("simpe-menu3", this._extra2, 6, "left");
        Main.panel.addToStatusArea("simpe-menu2", this._extra, 7, "left");
    }

    disable () {
        this._indicator.destroy();
        this._indicator = null;
        this._extra.destroy();
        this._extra = null;
        this._extra2.destroy();
        this._extra2 = null;
    }
}

function init() {
    return new Extension();
}
