// const { __ } = wp.i18n;
const { Fragment } = wp.element;
// const { registerPlugin } = wp.plugins;
// const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const { compose, withState } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { FocalPointPicker } = wp.components;

const Focal = compose(
	withSelect(select => {
		const currentMeta = select("core/editor").getCurrentPostAttribute("meta");
		const editedMeta = select("core/editor").getEditedPostAttribute("meta");
		return {
			meta: { ...currentMeta, ...editedMeta }
		};
	}),
	withDispatch(dispatch => ({
		updateFeaturedImagefocalPoint(value, meta) {
			v = JSON.stringify(value);
			meta = { ...meta, featured_image_focalpoint: v };
			dispatch("core/editor").editPost({ meta });
		}
	}))
)(props => {
	const { meta, setState, updateFeaturedImagefocalPoint } = props;
	const url = props.props.media && props.props.media.source_url;
	const dimensions = {
		width: 400,
		height: 600
	};
	const focalPoint =
		meta.featured_image_focalpoint &&
		JSON.parse(meta.featured_image_focalpoint);
	return (
		<FocalPointPicker
			url={url}
			value={focalPoint}
			onChange={focalPoint => updateFeaturedImagefocalPoint(focalPoint)}
		/>
	);
});

var el = wp.element.createElement;

function wrapPostFeaturedImage(OriginalComponent) {
	return function(props) {
		return (
			<Fragment>
				<Focal props={props} />
				{el(OriginalComponent, props)}
			</Fragment>
		);
	};
}

wp.hooks.addFilter(
	"editor.PostFeaturedImage",
	"my-plugin/wrap-post-featured-image",
	wrapPostFeaturedImage
);
