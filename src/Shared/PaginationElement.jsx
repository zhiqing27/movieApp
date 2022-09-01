import { Pagination } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
    root: {
      "& .MuiPaginationItem-root": {
        color: "#fff"
      }
    }
  }));
  
const PaginationElement = ({ setPage, numOfPages  }) => {
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    };
    const classes = useStyles();
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: "20px 0px",
            color: "white"
        }}>
            <Pagination className={classes.root}
                count={numOfPages}
                color="primary"
                // shape="rounded"
                size="large"
                hideNextButton
                hidePrevButton
                onChange={(e) => handlePageChange(e.target.textContent)}
            />
        </div>
    );
};

export default PaginationElement;
