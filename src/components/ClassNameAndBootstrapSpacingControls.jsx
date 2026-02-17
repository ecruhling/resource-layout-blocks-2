import {useMemo} from "@wordpress/element";
import {BlockControls, InspectorControls} from "@wordpress/block-editor";
import {
    Card,
    CardBody,
    CardHeader,
    Flex,
    FlexItem,
    Icon,
    SelectControl,
    TabPanel,
    TextControl,
    ToolbarGroup,
    VisuallyHidden
} from "@wordpress/components";

import {sidesBottom, sidesLeft, sidesRight, sidesTop} from '@wordpress/icons';

import {
    BS_BREAKPOINTS,
    parseBootstrapSpacingFromClassName,
    updateBootstrapSpacingSlot,
} from "../util/classnameBootstrapSpacing";

const TABS = [
    {name: "", label: "-"},
    {name: "sm", label: "SM"},
    {name: "md", label: "MD"},
    {name: "lg", label: "LG"},
    {name: "xl", label: "XL"},
    {name: "xxl", label: "XXL"},
];

const NONE = {label: "— none —", value: ""};
const PAD_VALUES = ["0", "1", "2", "3", "4", "5"].map((v) => ({label: v, value: v}));
const MAR_VALUES = [{label: "auto", value: "auto"}, ...PAD_VALUES];

const PADDING_CONTROLS = [
    // {side: "", label: "Padding (p-*)", icon: sidesAll},
    {side: "t", label: "Padding Top (pt-*)", icon: sidesTop},
    {side: "e", label: "Padding End (pe-*)", icon: sidesRight},
    {side: "b", label: "Padding Bottom (pb-*)", icon: sidesBottom},
    {side: "s", label: "Padding Start (ps-*)", icon: sidesLeft},
];

const MARGIN_CONTROLS = [
    // {side: "", label: "Margin (m-*)", icon: sidesAll},
    {side: "t", label: "Margin Top (mt-*)", icon: sidesTop},
    {side: "e", label: "Margin End (me-*)", icon: sidesRight},
    {side: "b", label: "Margin Bottom (mb-*)", icon: sidesBottom},
    {side: "s", label: "Margin Start (ms-*)", icon: sidesLeft},
];

function getValue(parsed, type, bp, side) {
    return parsed?.[type]?.[bp]?.[side] ?? "";
}

function bpHasAnySpacing(parsed, bp) {
    const types = ["p", "m"];
    const sides = ["", "t", "b", "s", "e"]; // only UI sides (x/y get expanded into s/e or t/b by parser)
    for (const type of types) {
        for (const side of sides) {
            const v = parsed?.[type]?.[bp]?.[side];
            if (v !== null && v !== undefined) return true; // '0' is valid and should count as modified
        }
    }
    return false;
}

export default function ClassNameAndBootstrapSpacingControls({className, setClassName}) {
    const parsed = useMemo(() => parseBootstrapSpacingFromClassName(className), [className]);

    const setSlot = (type, bp, side, nextVal) => {
        const val = nextVal === "" ? null : nextVal;
        const next = updateBootstrapSpacingSlot(className || "", {type, bp, side}, val);
        setClassName(next);
    };

    const tabsWithIndicators = useMemo(() => {
        return TABS.map((t) => {
            const modified = bpHasAnySpacing(parsed, t.name);
            return {
                name: t.name,
                title: (
                    <span className="resource-tab-label">
            {modified && (
                <>
                    <span className="resource-tab-dot" aria-hidden="true"/>
                    <VisuallyHidden>modified</VisuallyHidden>
                </>
            )}
                        {t.label}
          </span>
                ),
            };
        });
    }, [parsed]);

    return (
        <>
            {/* Always-visible toolbar class editor */}
            <BlockControls>
                <ToolbarGroup>
                    <div
                        className="resource-toolbar-classes"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "0 6px",
                            maxWidth: 520,
                        }}
                    >
                        <span style={{fontSize: 10, whiteSpace: "nowrap"}}>classes</span>
                        <div style={{minWidth: 250, maxWidth: 500}}>
                            <TextControl value={className || ""} onChange={(v) => setClassName(v)}/>
                        </div>
                    </div>
                </ToolbarGroup>
            </BlockControls>

            {/* Breakpoint tabs */}
            <InspectorControls>
                <TabPanel
                    className="resource-bp-tabs"
                    tabs={tabsWithIndicators}
                >
                    {(tab) => {
                        const bp = tab.name; // '' | sm | md | lg | xl | xxl
                        if (!BS_BREAKPOINTS.includes(bp)) return null;

                        return (
                            <Card isRounded={false}>
                                <CardHeader
                                    isRounded={false}
                                    isBorderless={true}
                                    isShady={true}
                                    size="extraSmall"
                                    className="resource-card-header"
                                >
                                    {`${tab.name.toUpperCase()} PADDING`}
                                </CardHeader>
                                <CardBody size="small">
                                    <Flex wrap={true}>
                                        {PADDING_CONTROLS.map(({side, label, icon}) => (
                                            <FlexItem style={{maxWidth: '42.5px'}}
                                            >
                                                <Icon icon={icon}/>
                                                <SelectControl
                                                    __next40pxDefaultSize
                                                    size={'compact'}
                                                    hideLabelFromVision
                                                    key={`p-${bp}-${side}`}
                                                    label={label}
                                                    value={getValue(parsed, "p", bp, side)}
                                                    options={[NONE, ...PAD_VALUES]}
                                                    style={{maxWidth: '42.5px'}}
                                                    onChange={(v) => setSlot("p", bp, side, v)}
                                                />
                                            </FlexItem>
                                        ))}
                                    </Flex>
                                </CardBody>
                                <CardHeader
                                    isRounded={false}
                                    isBorderless={true}
                                    isShady={true}
                                    size="extraSmall"
                                    className="resource-card-header"
                                >
                                    {`${tab.name.toUpperCase()} MARGIN`}
                                </CardHeader>
                                <CardBody size="small">
                                    <Flex wrap={true}>
                                        {MARGIN_CONTROLS.map(({side, label, icon}) => (
                                            <FlexItem style={{maxWidth: '42.5px'}}
                                            >
                                                <Icon icon={icon}/>
                                                <SelectControl
                                                    __next40pxDefaultSize
                                                    size={'compact'}
                                                    hideLabelFromVision
                                                    key={`m-${bp}-${side}`}
                                                    label={label}
                                                    value={getValue(parsed, "m", bp, side)}
                                                    options={[NONE, ...MAR_VALUES]}
                                                    style={{maxWidth: '42.5px'}}
                                                    onChange={(v) => setSlot("m", bp, side, v)}
                                                />
                                            </FlexItem>
                                        ))}
                                    </Flex>
                                </CardBody>
                            </Card>
                        );
                    }}
                </TabPanel>
            </InspectorControls>
        </>
    );
}
