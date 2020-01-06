const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerPlugin } = wp.plugins;
const {
	PluginSidebar,
	PluginSidebarMoreMenuItem,
	PluginDocumentSettingPanel
} = wp.editPost;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
import "./editor.scss";

const {
	PanelBody,
	PanelRow,
	DateTimePicker,
	BaseControl,
	TabPanel
} = wp.components;

const PluginSidebarDemo = () => {
	function show() {
		if (
			wp.data.select("core/editor").getCurrentPostType() === "ausstellungen" ||
			wp.data.select("core/editor").getCurrentPostType() === "projekte"
		) {
			return true;
		}
	}

	return (
		<Fragment>
			{show() && (
				<div>
					<PluginDocumentSettingPanel
						name="custom-panel"
						title="Date"
						className="custom-panel"
					>
						<PanelBody title="Start Zeit" initialOpen={false}>
							<PanelRow>
								<MetaTextControl metaKey={"kubase_event_start_date"} />
							</PanelRow>
						</PanelBody>

						<PanelBody title="End Zeit" initialOpen={false}>
							<PanelRow>
								<MetaTextControl metaKey={"kubase_event_end_date"} />
							</PanelRow>
						</PanelBody>
					</PluginDocumentSettingPanel>
				</div>
			)}
		</Fragment>
	);
};

registerPlugin("namespace-plugin-name", {
	icon: "calendar-alt", // The Plugin Dashicon
	render: PluginSidebarDemo
});

var MetaTextControl = compose(
	withDispatch(function(dispatch, props) {
		return {
			setMetaValue: function(metaValue) {
				let withSecondsToZero = metaValue.slice(0, 17) + "00";
				dispatch("core/editor").editPost({
					meta: { [props.metaKey]: withSecondsToZero }
				});
			}
		};
	}),
	withSelect(function(select, props) {
		return {
			metaValue: select("core/editor").getEditedPostAttribute("meta")[
				props.metaKey
			]
		};
	})
)(function(props) {
	return (
		<DateTimePicker
			currentDate={props.metaValue}
			onChange={props.setMetaValue}
		/>
	);
});
