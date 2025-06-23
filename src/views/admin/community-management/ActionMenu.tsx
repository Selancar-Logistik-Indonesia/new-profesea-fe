import { Icon } from "@iconify/react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { IReportedRowData } from "src/contract/models/report";
import ContentPreviewDialog from "./ContentPreviewDialog";



const ActionMenu = ({ row }: { row: IReportedRowData }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const [open, setOpen] = useState<boolean>(false);

    const onClose = () => {
      setOpen(false);
    }
    
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const handleAllow = () => {
      row.allow();
      handleClose();
    };
    
    const handleDelete = () => {
      row.delete();
      handleClose();
    };
  
    return (
      <Box>
        <ContentPreviewDialog row={row} open={open} onClose={onClose}/>
        <IconButton
          id={`basic-button-${row.id}`}
          aria-controls={isOpen ? `basic-menu-${row.id}` : undefined}
          aria-haspopup='true'
          aria-expanded={isOpen ? 'true' : undefined}
          onClick={handleOpenMenu}
        >
          <Icon icon='ph:dots-three-vertical' fontSize={20} color={'#404040'} />
        </IconButton>
        <Menu
          id={`basic-menu-${row.id}`}
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <MenuItem
            onClick={() => {
              setOpen(true);
              handleClose();
            }}
            sx={{ display: open ? 'none' :  'flex', alignItems: 'center', gap: '8px' }}
          >
            <Icon icon='lets-icons:view' fontSize={20} />
            View Full Post
          </MenuItem>
          <MenuItem
            onClick={handleAllow}
            sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4CAF50' }}
          >
            <Icon icon='ph:check' fontSize={20} />
            Allow
          </MenuItem>
          <MenuItem
            onClick={handleDelete}
            sx={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF2222' }}
          >
            <Icon icon='tabler:trash' fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
      </Box>
    );
  };

  export default ActionMenu