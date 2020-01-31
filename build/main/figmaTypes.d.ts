export interface Global {
    /** a string uniquely identifying this node within the document */
    readonly id: string;
    /** the name given to the node by the user in the tool. */
    readonly name: string;
    /** whether or not the node is visible on the canvas */
    readonly visible?: boolean;
    /** the type of the node, refer to table below for details */
    readonly type: NodeType;
}
/**
 * Styles can be one of the following types
 */
export declare type StyleType = 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
/**
 * the above styles can be used in the following ways
 */
export declare type StyleKeyType = 'fill' | 'stroke' | 'effect' | 'grid' | 'text' | 'background';
export declare type StylesObject = {
    [key in StyleKeyType]: Record<key, string>;
}[StyleKeyType];
export declare type ScaleMode = 'FILL' | 'FIT' | 'TILE' | 'STRETCH';
export declare type PaintTypeSolid = 'SOLID';
export declare type PaintTypeGraident = 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND';
export declare type PaintTypeImage = 'IMAGE' | 'EMOJI';
export declare type TextType = 'TEXT';
export declare type PaintType = PaintTypeSolid | PaintTypeGraident | PaintTypeImage;
/**
 * how the layer blends with layers below
 */
export declare type BlendMode = 'PASS_THROUGH' /** (Only applicable to objects with children) */ | 'NORMAL'
/** Darken: */
 | 'DARKEN' | 'MULTIPLY' | 'LINEAR_BURN' | 'COLOR_BURN'
/** Lighten: */
 | 'LIGHTEN' | 'SCREEN' | 'LINEAR_DODGE' | 'COLOR_DODGE'
/** Contrast: */
 | 'OVERLAY' | 'SOFT_LIGHT' | 'HARD_LIGHT'
/** Inversion: */
 | 'DIFFERENCE' | 'EXCLUSION'
/** Component: */
 | 'HUE' | 'SATURATION' | 'COLOR' | 'LUMINOSITY';
export declare type EasingType = 'EASE_IN' /** Ease in with an animation curve similar to CSS ease-in */ | 'EASE_OUT' /** Ease out with an animation curve similar to CSS ease-out */ | 'EASE_IN_AND_OUT'; /** Ease in and then out with an animation curve similar to CSS ease-in-out */
export declare type RoleType = 'viewer' | 'editor' | 'owner';
export declare type NodeType = 'DOCUMENT' | 'CANVAS' | 'FRAME' | 'GROUP' | 'VECTOR' | 'BOOLEAN' | 'STAR' | 'LINE' | 'ELLIPSE' | 'REGULAR_POLYGON' | 'RECTANGLE' | 'TEXT' | 'SLICE' | 'COMPONENT' | 'INSTANCE';
export declare type Node = Document | Canvas | Frame | Group | Vector | BooleanGroup | Star | Line | Ellipse | RegularPolygon | Rectangle | Text | Slice | Component | Instance;
/** Node Properties */
/** The root node */
export interface Document extends Global {
    readonly type: 'DOCUMENT';
    /** An array of canvases attached to the document */
    readonly children: ReadonlyArray<Canvas>;
}
/** Represents a single page */
export interface Canvas extends Global {
    readonly type: 'CANVAS';
    /** An array of top level layers on the canvas */
    readonly children: ReadonlyArray<Node>;
    /** Background color of the canvas */
    readonly backgroundColor: Color;
    /** Node ID that corresponds to the start frame for prototypes */
    readonly prototypeStartNodeID: string | null;
    /** An array of export settings representing images to export from the canvas */
    readonly exportSettings?: ReadonlyArray<ExportSetting>;
}
export interface FrameBase extends Global {
    /** An array of nodes that are direct children of this node */
    readonly children: ReadonlyArray<Node>;
    /** Backgrounds on the node */
    readonly background: ReadonlyArray<Paint>;
    /** Background color of the node. This is deprecated, as frames now support more than a solid color as a background. Please use the background field instead. */
    readonly backgroundColor: Color;
    /**
     * An array of export settings representing images to export from node
     * @default []
     */
    readonly exportSettings?: ReadonlyArray<ExportSetting>;
    /**
     * How this node blends with nodes behind it in the scene
     * (see blend mode section for more details)
     */
    readonly blendMode: BlendMode;
    /**
     * Keep height and width constrained to same ratio
     * @default false
     */
    readonly preserveRatio?: boolean;
    /** Horizontal and vertical layout constraints for node */
    readonly constraints: LayoutConstraint;
    /**
     * Node ID of node to transition to in prototyping
     * @default null
     */
    readonly transitionNodeID?: string | null;
    /**
     * The duration of the prototyping transition on this node (in milliseconds)
     * @default null
     */
    readonly transitionDuration?: number | null;
    /**
     * The easing curve used in the prototyping transition on this node
     * @default null
     */
    readonly transitionEasing?: EasingType | null;
    /**
     * Opacity of the node
     * @default 1
     */
    readonly opacity?: number;
    /** Bounding box of the node in absolute space coordinates */
    readonly absoluteBoundingBox: Rect;
    /**
     * Width and height of element. This is different from the width and height
     * of the bounding box in that the absolute bounding box represents the
     * element after scaling and rotation. Only present if geometry=paths
     * is passed
     */
    readonly size?: Vector2;
    /**
     * The top two rows of a matrix that represents the 2D transform of this
     * node relative to its parent. The bottom row of the matrix is implicitly
     * always (0, 0, 1). Use to transform coordinates in geometry.
     * Only present if geometry=paths is passed
     */
    readonly relativeTransform?: Transform;
    /** Does this node clip content outside of its bounds? */
    readonly clipsContent: boolean;
    /**
     * An array of layout grids attached to this node (see layout grids section
     * for more details). GROUP nodes do not have this attribute
     * @default []
     */
    readonly layoutGrids?: ReadonlyArray<LayoutGrid>;
    /**
     * An array of effects attached to this node
     * (see effects sectionfor more details)
     * @default []
     */
    readonly effects: ReadonlyArray<Effect>;
    /**
     * Does this node mask sibling nodes in front of it?
     * @default false
     */
    readonly isMask?: boolean;
    /**
     * Styles this node uses from the global `styles`
     */
    readonly styles?: StylesObject;
}
/** A node of fixed size containing other nodes */
export interface Frame extends FrameBase {
    readonly type: 'FRAME';
}
/** A logical grouping of nodes */
export interface Group extends FrameBase {
    readonly type: 'GROUP';
}
export interface VectorBase extends Global {
    /**
     * An array of export settings representing images to export from node
     * @default []
     */
    readonly exportSettings?: ReadonlyArray<ExportSetting>;
    /**
     * How this node blends with nodes behind it in the scene
     * (see blend mode section for more details)
     */
    readonly blendMode: BlendMode;
    /**
     * Keep height and width constrained to same ratio
     * @default false
     */
    readonly preserveRatio?: boolean;
    /**
     * Horizontal and vertical layout constraints for node
     */
    readonly constraints: LayoutConstraint;
    /**
     * Node ID of node to transition to in prototyping
     * @default null
     */
    readonly transitionNodeID?: string | null;
    /**
     * The duration of the prototyping transition on this node (in milliseconds)
     * @default null
     */
    readonly transitionDuration?: number | null;
    /**
     * The easing curve used in the prototyping transition on this node
     * @default null
     */
    readonly transitionEasing?: EasingType | null;
    /**
     * Opacity of the node
     * @default 1
     */
    readonly opacity?: number;
    /** Bounding box of the node in absolute space coordinates */
    readonly absoluteBoundingBox: Rect;
    /**
     * Width and height of element. This is different from the width and height
     * of the bounding box in that the absolute bounding box represents the
     * element after scaling and rotation. Only present if geometry=paths
     * is passed
     */
    readonly size?: Vector2;
    /**
     * The top two rows of a matrix that represents the 2D transform of this
     * node relative to its parent. The bottom row of the matrix is implicitly
     * always (0, 0, 1). Use to transform coordinates in geometry.
     * Only present if geometry=paths is passed
     */
    readonly relativeTransform?: Transform;
    /**
     * An array of effects attached to this node
     * (see effects sectionfor more details)
     * @default []
     */
    readonly effects: ReadonlyArray<Effect>;
    /**
     * Does this node mask sibling nodes in front of it?
     * @default false
     */
    readonly isMask?: boolean;
    /**
     * An array of fill paints applied to the node
     * @default []
     */
    readonly fills: ReadonlyArray<Paint>;
    /**
     * Only specified if parameter geometry=paths is used. An array of paths
     * representing the object fill
     */
    readonly fillGeometry?: ReadonlyArray<Path>;
    /**
     * An array of stroke paints applied to the node
     * @default []
     */
    readonly strokes: ReadonlyArray<Paint>;
    /** The weight of strokes on the node */
    readonly strokeWeight: number;
    /**
     * Only specified if parameter geometry=paths is used. An array of paths
     * representing the object stroke
     */
    readonly strokeGeometry?: ReadonlyArray<Path>;
    /**
     * Where stroke is drawn relative to the vector outline as a string enum
     * "INSIDE": draw stroke inside the shape boundary
     * "OUTSIDE": draw stroke outside the shape boundary
     * "CENTER": draw stroke centered along the shape boundary
     */
    readonly strokeAlign: 'INSIDE' | 'OUTSIDE' | 'CENTER';
    /**
     * Styles this node uses from the global `styles`
     */
    readonly styles?: StylesObject;
}
/** A vector network, consisting of vertices and edges */
export interface Vector extends VectorBase {
    readonly type: 'VECTOR';
}
/** A group that has a boolean operation applied to it */
export interface BooleanGroup extends VectorBase {
    readonly type: 'BOOLEAN';
    /**
     * A string enum with value of "UNION", "INTERSECT", "SUBTRACT", or "EXCLUDE"
     * indicating the type of boolean operation applied
     */
    readonly booleanOperation: 'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE';
    /** An array of nodes that are being boolean operated on */
    readonly children: ReadonlyArray<Node>;
}
/** A regular star shape */
export interface Star extends VectorBase {
    readonly type: 'STAR';
}
/** A straight line */
export interface Line extends VectorBase {
    readonly type: 'LINE';
}
/** An ellipse */
export interface Ellipse extends VectorBase {
    readonly type: 'ELLIPSE';
}
/** A regular n-sided polygon */
export interface RegularPolygon extends VectorBase {
    readonly type: 'REGULAR_POLYGON';
}
/** A rectangle */
export interface Rectangle extends VectorBase {
    readonly type: 'RECTANGLE';
    /** Radius of each corner of the rectangle if a single radius is set for all corners */
    readonly cornerRadius?: number;
    /** Array of length 4 of the radius of each corner of the rectangle, starting in the top left and proceeding clockwise */
    readonly rectangleCornerRadii?: readonly [number, number, number, number];
}
/** A text box */
export interface Text extends VectorBase {
    readonly type: TextType;
    /** Text contained within text box */
    readonly characters: string;
    /**
     * Style of text including font family and weight (see type style
     * section for more information)
     */
    readonly style: TypeStyle;
    /**
     * Array with same number of elements as characeters in text 'box' |    * each element is a reference to the styleOverrideTable defined
     * below and maps to the corresponding character in the characters
     * field. Elements with value 0 have the default type style
     */
    readonly characterStyleOverrides: ReadonlyArray<number>;
    /** Map from ID to TypeStyle for looking up style overrides */
    readonly styleOverrideTable: {
        readonly [index: number]: TypeStyle;
    };
}
/** A rectangular region of the canvas that can be exported */
export interface Slice extends Global {
    readonly type: 'SLICE';
    /** An array of export settings representing images to export from this node */
    readonly exportSettings: ReadonlyArray<ExportSetting>;
    /** Bounding box of the node in absolute space coordinates */
    readonly absoluteBoundingBox: Rect;
    /**
     * Width and height of element. This is different from the width and height
     * of the bounding box in that the absolute bounding box represents the
     * element after scaling and rotation. Only present if geometry=paths
     * is passed
     */
    readonly size?: Vector2;
    /**
     * The top two rows of a matrix that represents the 2D transform of this
     * node relative to its parent. The bottom row of the matrix is implicitly
     * always (0, 0, 1). Use to transform coordinates in geometry.
     * Only present if geometry=paths is passed
     */
    readonly relativeTransform?: Transform;
}
/** A node that can have instances created of it that share the same properties */
export interface Component extends FrameBase {
    readonly type: 'COMPONENT';
}
/**
 * An instance of a component, changes to the component result in the same
 * changes applied to the instance
 */
export interface Instance extends FrameBase {
    readonly type: 'INSTANCE';
    /**
     * ID of component that this instance came from, refers to components
     * table (see endpoints section below)
     */
    readonly componentId: string;
}
/** An RGBA color */
export interface Color {
    /** Red channel value, between 0 and 1 */
    readonly r: number;
    /** Green channel value, between 0 and 1 */
    readonly g: number;
    /** Blue channel value, between 0 and 1 */
    readonly b: number;
    /** Alpha channel value, between 0 and 1 */
    readonly a: number;
}
/** Format and size to export an asset at */
export interface ExportSetting {
    /** File suffix to append to all filenames */
    readonly suffix: string;
    /** Image type, string enum */
    readonly format: 'JPG' | 'PNG' | 'SVG' | 'PDF';
    /** Constraint that determines sizing of exported asset */
    readonly constraint: Constraint;
}
/** Sizing constraint for exports */
export interface Constraint {
    /**
     * Type of constraint to apply; string enum with potential values below
     * "SCALE": Scale by value
     * "WIDTH": Scale proportionally and set width to value
     * "HEIGHT": Scale proportionally and set height to value
     */
    readonly type: 'SCALE' | 'WIDTH' | 'HEIGHT';
    /** See type property for effect of this field */
    readonly value: number;
}
/** A rectangle that expresses a bounding box in absolute coordinates */
export interface Rect {
    /** X coordinate of top left corner of the rectangle */
    readonly x: number;
    /** Y coordinate of top left corner of the rectangle */
    readonly y: number;
    /** Width of the rectangle */
    readonly width: number;
    /** Height of the rectangle */
    readonly height: number;
}
/** Layout constraint relative to containing Frame */
export interface LayoutConstraint {
    /**
     * Vertical constraint as an enum
     * "TOP": Node is laid out relative to top of the containing frame
     * "BOTTOM": Node is laid out relative to bottom of the containing frame
     * "CENTER": Node is vertically centered relative to containing frame
     * "TOP_BOTTOM": Both top and bottom of node are constrained relative to containing frame (node stretches with frame)
     * "SCALE": Node scales vertically with containing frame
     */
    readonly vertical: 'TOP' | 'BOTTOM' | 'CENTER' | 'TOP_BOTTOM' | 'SCALE';
    /**
     * Horizontal constraint as an enum
     * "LEFT": Node is laid out relative to left of the containing frame
     * "RIGHT": Node is laid out relative to right of the containing frame
     * "CENTER": Node is horizontally centered relative to containing frame
     * "LEFT_RIGHT": Both left and right of node are constrained relative to containing frame (node stretches with frame)
     * "SCALE": Node scales horizontally with containing frame
     */
    readonly horizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'LEFT_RIGHT' | 'SCALE';
}
/** Guides to align and place objects within a frame */
export interface LayoutGrid {
    /**
     * Orientation of the grid as a string enum
     * "COLUMNS": Vertical grid
     * "ROWS": Horizontal grid
     * "GRID": Square grid
     */
    readonly pattern: 'COLUMNS' | 'ROWS' | 'GRID';
    /** Width of column grid or height of row grid or square grid spacing */
    readonly sectionSize: number;
    /** Is the grid currently visible? */
    readonly visible: boolean;
    /** Color of the grid */
    readonly color: Color;
    /**
     * Positioning of grid as a string enum
     * "MIN": Grid starts at the left or top of the frame
     * "MAX": Grid starts at the right or bottom of the frame
     * "CENTER": Grid is center aligned
     */
    readonly alignment: 'MIN' | 'MAX' | 'CENTER';
    /** Spacing in between columns and rows */
    readonly gutterSize: number;
    /** Spacing before the first column or row */
    readonly offset: number;
    /** Number of columns or rows */
    readonly count: number;
}
/** A visual effect such as a shadow or blur */
export interface Effect {
    /** Type of effect as a string enum */
    readonly type: 'INNER_SHADOW' | 'DROP_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
    /** Is the effect active? */
    readonly visible: boolean;
    /** Radius of the blur effect (applies to shadows as well) */
    readonly radius: number;
    readonly color?: Color;
    readonly blendMode?: BlendMode;
    readonly offset?: Vector2;
}
/** A solid color, gradient, or image texture that can be applied as fills or strokes */
export interface Paint {
    /** Type of paint as a string enum */
    readonly type: PaintType;
    /**
     * Is the paint enabled?
     * @default true
     */
    readonly visible?: boolean;
    /**
     * Overall opacity of paint (colors within the paint can also have opacity
     * values which would blend with this)
     * @default 1
     */
    readonly opacity?: number;
    /** Solid color of the paint */
    readonly color?: Color;
    /**
     * How this node blends with nodes behind it in the scene
     * (see blend mode section for more details)
     */
    readonly blendMode: BlendMode;
    /**
     * This field contains three vectors, each of which are a position in
     * normalized object space (normalized object space is if the top left
     * corner of the bounding box of the object is (0, 0) and the bottom
     * right is (1,1)). The first position corresponds to the start of the
     * gradient (value 0 for the purposes of calculating gradient stops),
     * the second position is the end of the gradient (value 1), and the
     * third handle position determines the width of the gradient (only
     * relevant for non-linear gradients).
     *
     */
    readonly gradientHandlePositions?: ReadonlyArray<Vector2>;
    /**
     * Positions of key points along the gradient axis with the colors
     * anchored there. Colors along the gradient are interpolated smoothly
     * between neighboring gradient stops.
     */
    readonly gradientStops?: ReadonlyArray<ColorStop>;
    /** Image scaling mode */
    readonly scaleMode?: ScaleMode;
    /**
     * Affine transform applied to the image, only present if scaleMode is `STRETCH`
     */
    readonly imageTransform?: Transform;
    /**
     * Amount image is scaled by in tiling, only present if scaleMode is `TILE`
     */
    readonly scalingFactor?: number;
    /**
     * A reference to an image embedded in the file. To download the image using this reference,
     * use the GET file images endpoint to retrieve the mapping from image references to image URLs
     */
    readonly imageRef?: string;
    /**
     * A reference to the GIF embedded in this node, if the image is a GIF.
     * To download the image using this reference,
     * use the GET file images endpoint to retrieve the mapping from image references to image URLs
     */
    readonly gifRef?: string;
}
export interface Path {
    /** A sequence of path commands in SVG notation */
    readonly path: string;
    /** Winding rule for the path */
    readonly windingRule: 'EVENODD' | 'NONZERO';
}
export declare type Transform = ReadonlyArray<ReadonlyArray<number>>;
/** A 2d vector */
export interface Vector2 {
    /** X coordinate of the vector */
    readonly x: number;
    /** Y coordinate of the vector */
    readonly y: number;
}
/** A position color pair representing a gradient stop */
export interface ColorStop {
    /** Value between 0 and 1 representing position along gradient axis */
    readonly position: number;
    /** Color attached to corresponding position */
    readonly color: Color;
}
/** Metadata for character formatting */
export interface TypeStyle {
    /** Font family of text (standard name) */
    readonly fontFamily: string;
    /** PostScript font name */
    readonly fontPostScriptName: string;
    /** Space between paragraphs in px, 0 if not present */
    readonly paragraphSpacing?: number;
    /** Paragraph indentation in px, 0 if not present */
    readonly paragraphIndent?: number;
    /** Is text italicized? */
    readonly italic?: boolean;
    /** Numeric font weight */
    readonly fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    /** Font size in px */
    readonly fontSize: number;
    /** Horizontal text alignment as string enum */
    readonly textAlignHorizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'JUSTIFIED';
    /** Vertical text alignment as string enum */
    readonly textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
    /** Space between characters in px */
    readonly letterSpacing: number;
    /** Paints applied to characters */
    readonly fills?: ReadonlyArray<Paint>;
    /** Line height in px */
    readonly lineHeightPx: number;
    /** Line height as a percentage of normal line height */
    readonly lineHeightPercent: number;
    /** The unit of the line height value specified by the user. */
    readonly lineHeightUnit: 'PIXELS' | 'FONT_SIZE_%' | 'INTRINSIC_%';
    /** Text casing applied to the node, default is the original casing */
    readonly textCase?: 'UPPER' | 'LOWER' | 'TITLE';
    /** Text decoration applied to the node, default is none */
    readonly textDecoration?: 'STRIKETHROUGH' | 'UNDERLINE';
    /** Line height as a percentage of the font size. Only returned when lineHeightPercent is not 100. */
    readonly lineHeightPercentFontSize?: number;
}
/**
 * A description of a master component. Helps you identify which component
 * instances are attached to
 */
export interface ComponentMetadata {
    /** The unique identifier of the element */
    readonly key: string;
    /** The name of the element */
    readonly name: string;
    /** The description of the element as entered in the editor */
    readonly description: string;
}
export interface FrameInfo {
    /** Id of the frame node within the figma file */
    readonly node_id: string;
    /** The name of the frame */
    readonly name: string;
    /** Background color of the frame */
    readonly background_color: string;
    /** Id of the frame's residing page */
    readonly page_id: string;
    /** Name of the frame's residing page */
    readonly page_name: string;
}
interface SharedElement extends ComponentMetadata {
    /** The unique identifier of the figma file which contains the element */
    readonly file_key: string;
    /** Id of the component node within the figma file */
    readonly node_id: string;
    /** URL link to the element's thumbnail image */
    readonly thumbnail_urlString: string;
    /** The UTC ISO 8601 time at which the element was created */
    readonly created_at: string;
    /** The UTC ISO 8601 time at which the element was updated */
    readonly updated_at: string;
    /** The user who last updated the element */
    readonly user: User;
}
/**
 * An arrangement of published UI elements that can be instantiated across figma files
 */
export interface FullComponentMetadata extends SharedElement {
    /** Data on component's containing frame, if component resides within a frame */
    readonly containing_frame: FrameInfo;
    /** Data on component's containing page, if component resides in a multi-page file */
    readonly containing_page: any;
}
export interface FullStyleMetadata extends SharedElement {
    /** The type of style */
    readonly style_type: StyleType;
    /** A user specified order number by which the style can be sorted */
    readonly sort_position: string;
}
/**
 *  A description of styles used in a file.
 */
export interface Style {
    /** The name of the stlye */
    readonly name: string;
    /** A description of the style */
    readonly description: string;
    /** The unique identifier of the style */
    readonly key: string;
    /** The type of style */
    readonly styleType: StyleType;
}
/** A comment or reply left by a user */
export interface Comment {
    /** Unique identifier for comment */
    readonly id: string;
    /** The file in which the comment lives */
    readonly file_key: string;
    /** If present, the id of the comment to which this is the reply */
    readonly parent_id: string;
    /** The user who left the comment */
    readonly user: User;
    /** The time at which the comment was left */
    readonly created_at: Date;
    /** If set, when the comment was resolved */
    readonly resolved_at: Date | null;
    /**
     * (MISSING IN DOCS)
     * The content of the comment
     */
    readonly message: string;
    readonly client_meta: Vector2 | FrameOffset;
    /**
     * Only set for top level comments. The number displayed with the
     * comment in the UI
     */
    readonly order_id: number;
}
/** A description of a user */
export interface User {
    /** Unique stable id of the user */
    readonly id: string;
    /** Name of the user */
    readonly handle: string;
    /** URL link to the user's profile image */
    readonly img_url: string;
}
/** A relative offset within a frame */
export interface FrameOffset {
    /** Unique id specifying the frame */
    readonly node_id: string;
    /** 2d vector offset within the frame */
    readonly node_offset: Vector2;
}
export interface FileResponse {
    readonly components: {
        readonly [key: string]: ComponentMetadata;
    };
    readonly styles: {
        readonly [key: string]: Style;
    };
    readonly document: Document;
    readonly lastModified: string;
    readonly name: string;
    readonly role: RoleType;
    readonly schemaVersion: number;
    readonly thumbnailUrl: string;
    readonly version: string;
}
export interface FileNodesResponse {
    readonly nodes: {
        readonly [key: string]: null | {
            readonly document: Node;
            readonly components: {
                readonly [key: string]: ComponentMetadata;
            };
            readonly styles: {
                readonly [key: string]: Style;
            };
            readonly schemaVersion: number;
        };
    };
    readonly lastModified: string;
    readonly name: string;
    readonly role: RoleType;
    readonly thumbnailUrl: string;
    readonly version: string;
}
export interface VersionMetadata {
    /** Unique identifier for version */
    readonly id: string;
    /** The UTC ISO 8601 time at which the version was created */
    readonly created_at: string;
    /** The label given to the version in the editor */
    readonly label: string;
    /** The description of the version as entered in the editor */
    readonly description: string;
    /** The user that created the version */
    readonly user: User;
}
export interface FileVersionsResponse {
    readonly versions: ReadonlyArray<VersionMetadata>;
}
export interface FileImageResponse {
    readonly err: string | null;
    readonly status: number | undefined;
    readonly images: {
        readonly [id: string]: string | null;
    };
}
export interface FileImageFillsResponse extends StatusResponse {
    readonly meta: {
        readonly images: {
            readonly [imageRef: string]: string;
        };
    };
}
export interface CommentsResponse {
    readonly comments: ReadonlyArray<Comment>;
}
export interface TeamProjectsResponse {
    readonly name: string;
    readonly projects: ReadonlyArray<ProjectSummary>;
}
export interface ProjectSummary {
    readonly id: string;
    readonly name: string;
}
export interface ProjectFilesResponse {
    readonly name: string;
    readonly files: ReadonlyArray<FileSummary>;
}
export interface FileSummary {
    readonly key: string;
    readonly name: string;
    readonly thumbnail_url: string;
    readonly last_modified: string;
}
export interface PaginationResponse {
    readonly cursor: {
        readonly before: number;
        readonly after: number;
    };
}
export interface StatusResponse {
    readonly error: string | false;
    readonly status: number;
}
export interface ComponentResponse extends StatusResponse {
    readonly meta: FullComponentMetadata;
}
export interface TeamComponentsResponse extends StatusResponse {
    readonly meta: PaginationResponse & {
        readonly components: ReadonlyArray<FullComponentMetadata>;
    };
}
export interface FileComponentsResponse extends StatusResponse {
    readonly meta: {
        readonly components: ReadonlyArray<FullComponentMetadata>;
    };
}
export interface StyleResponse extends StatusResponse {
    readonly meta: FullStyleMetadata;
}
export interface TeamStylesResponse extends StatusResponse {
    readonly meta: PaginationResponse & {
        readonly styles: ReadonlyArray<FullStyleMetadata>;
    };
}
export interface FileStylesResponse extends StatusResponse {
    readonly meta: {
        readonly styles: ReadonlyArray<FullStyleMetadata>;
    };
}
export {};
