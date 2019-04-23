import { alignments } from '../const';

import { PhaserObjects } from '../phaser_objects';

/** Group with a dedicated background image.
 * @extends Phaser.Group
 */
export class Frame extends PhaserObjects.Group {
    /**
     * @param {Object} game - Current game instance.
     * @param {Number} x - The x position of the Frame.
     * @param {Number} y - The y position of the Frame.
     * @param {string} bg - The background image to use.
     */
    constructor(game, x = 0, y = 0, bg = 0) {
        super(game);
        game.add.existing(this);

        this.x = x;
        this.y = y;

        this.game = game;
        this.bg = bg;

        // Add background to Frame.
        if (bg !== null) {
            const bgSprite = new PhaserObjects.Sprite(game, 0, 0, bg);
            bgSprite.sendToBack();
            bgSprite.alignIn(this, alignments.TOP_LEFT);
        }
    }

    /** Adds a new object into the Column, then aligns it under the previous object.
     * @param {Object} node - The sprite to add to the Column.
     * @param {Number} paddingX - The amount of horizontal space between objects.
     * @param {Number} paddingY - The amount of vertical space between objects.
     * @param {Number} alignment - The alignment relative to the previous child.
     */
    addNode(node, paddingX = 0, paddingY = 0, alignment = null) {
        const align = alignment || this.alignment;

        this.add(node);
        const nodes = this.getNodes();
        const previousNode = nodes[nodes.length - 2];

        if (previousNode !== undefined) {
            this.alignChildren(node, previousNode, align, paddingX, paddingY);
        }

        // Reset the positions for the bar's draggable area.
        if ('enableBarDrag' in node) {
            node.enableBarDrag();
        }
    }
}
