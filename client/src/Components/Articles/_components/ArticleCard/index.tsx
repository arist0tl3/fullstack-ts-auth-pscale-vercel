import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const ArticleCardPropTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  featuredImageSrc: PropTypes.string,
};

type ArticleCardProps = PropTypes.InferProps<typeof ArticleCardPropTypes>;

export default function ArticleCard({ title, content, featuredImageSrc }: ArticleCardProps) {
  return (
    <Card>
      <CardHeader title={title} />
      {featuredImageSrc && <CardMedia image={featuredImageSrc} title={title} />}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {content.slice(0, 80)}
        </Typography>
      </CardContent>
    </Card>
  );
}

ArticleCard.propTypes = ArticleCardPropTypes;
