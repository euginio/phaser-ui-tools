const ExportedObjects = {};

let Group;
let Sprite;
let Button;
let Graphics;
let Easing;

// Phaser version specific base Group
({ Group } = Phaser);
if (Group === undefined) {
    Group = Phaser.GameObjects.Container;

    // Phaser 3
    Group.prototype.getNodes = function getNodes() {
        return this.getAll();
    };

    Group.prototype.alignChildren = function alignChildren(child, other, align, paddingX, paddingY) {
        const mapping = {
            0: Phaser.Display.Align.To.TopLeft,
            1: Phaser.Display.Align.To.TopCenter,
            8: Phaser.Display.Align.To.RightCenter,
            11: Phaser.Display.Align.To.BottomCenter,
        };
        mapping[align](child, other, paddingX, paddingY);
    };
} else {
    // Phaser 2
    Group.prototype.getNodes = function getNodes() {
        return this.children;
    };

    Group.prototype.alignChildren = function alignChildren(child, other, align, paddingX, paddingY) {
        child.alignTo(other, align, paddingX, paddingY);
    };
}

// Phaser version specific base Sprite
({ Sprite } = Phaser);
if (Sprite === undefined) {
    ({ Sprite } = Phaser.GameObjects);

    // Phaser 3: patch missing functions for:
    // Sprite.sendToBack
    // Sprite.alignIn
    Sprite.prototype.sendToBack = function sendToBack() {
        this.depth = -9999;
    };
    Sprite.prototype.alignIn = function alignIn(other, align) {
        // Map alignment constants to Phaser 3 Align functions
        const mapping = {
            0: Phaser.Display.Align.In.TopLeft,
            1: Phaser.Display.Align.In.TopCenter,
            8: Phaser.Display.Align.In.RightCenter,
            11: Phaser.Display.Align.In.BottomCenter,
        };
        mapping[align](this, other, other.width);
    };
}

// Phaser version specific base Button
({ Button } = Phaser);
if (Button === undefined) {
    Button = Sprite;
}


({ Graphics } = Phaser);
if (Graphics === undefined) {
    ({ Graphics } = Phaser.GameObjects);

    // Phaser 3
    class ViewportMask extends Graphics {
        constructor(game, x, y) {
            super(game, { x, y });
            this.x = x;
            this.y = y;
        }

        create(width, height) {
            this.fillStyle(0x800000, 1).fillRect(this.x, this.y, width, height);
        }
    }
    ExportedObjects.ViewportMask = ViewportMask;
} else {
    // Phaser 2
    class ViewportMask extends Graphics {
        constructor(game, x, y) {
            super(game, x, y);
            this.x = x;
            this.y = y;
        }

        create(width, height) {
            this.beginFill(0x0000ff);
            this.drawRect(this.x, this.y, width, height);
            this.endFill();
        }
    }
    ExportedObjects.ViewportMask = ViewportMask;
}

({ Easing } = Phaser);
if (Easing === undefined) {
    ({ Easing } = Phaser.Math);
}

ExportedObjects.Group = Group;
ExportedObjects.Sprite = Sprite;
ExportedObjects.Button = Button;
ExportedObjects.Easing = Easing;

export const PhaserObjects = ExportedObjects;
