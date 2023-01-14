export interface Size {
    width: string;
    height: string;
}

export interface Position {
    left: string;
    top: string;
}

export interface PositionedTemplateText {
    size: Size,
    position: Position,
    font: string,
    font_size: number
    font_color: string
    text_shadow?: string
}

export interface PositionedTemplateContainer extends PositionedItem {
    color?: string;
    background_color?: string,
    border_color?: string,
    border_radius?: string
}

export interface PositionedItem {
    size: Size
    position: Position
}

export interface FormField {
    name: string
    value: any
    type: string
}