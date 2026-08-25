import { Drawer, DRAWER_POSITIONS } from "@widgets/drawer";

import { AssignUserDrawer } from "@features/assign-user";
import { CreateProjectDrawer } from "@features/create-project-drawer";

export const TestWrapper = () => {
	return (
		// showSwipeHandle snapPoints={SNAP_POINTS}
		<Drawer position={DRAWER_POSITIONS.Right}>
			<Drawer.Trigger id="create-project">
				<button className="w-full h-[40px] bg-blue-400 cursor-pointer">Drawer</button>
			</Drawer.Trigger>
			<Drawer.Group>
				<Drawer.Content id="create-project">
					<Drawer.Header>
						<Drawer.Title>Create project</Drawer.Title>
						<Drawer.Close id="create-project" />
					</Drawer.Header>
					<div className="relative">
						<CreateProjectDrawer />
					</div>
				</Drawer.Content>
				<Drawer.Content id="assign-user">
					<Drawer.Header>
						<Drawer.Title>Assign user</Drawer.Title>
						<Drawer.Close id="assign-user" />
					</Drawer.Header>
					<AssignUserDrawer />
				</Drawer.Content>
			</Drawer.Group>
		</Drawer>
	);
};

// <Drawer>
// 	<DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
// 	<DrawerContent>
// 		<DrawerHeader>
// 			<DrawerTitle>Are you absolutely sure?</DrawerTitle>
// 			<DrawerDescription>This action cannot be undone.</DrawerDescription>
// 		</DrawerHeader>
// 		<div className="p-4">{/* Content here */}</div>
// 		<DrawerFooter>
// 			<Button>Submit</Button>
// 			<DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
// 		</DrawerFooter>
// 	</DrawerContent>
// </Drawer>;
//
// <Drawer showSwipeHandle>
// 	<DrawerTrigger render={<Button variant="secondary">Open Drawer</Button>} />
// 	<DrawerContent>
// 		<DrawerHeader>
// 			<DrawerTitle>Drawer</DrawerTitle>
// 			<DrawerDescription>Drawer with a swipe handle.</DrawerDescription>
// 		</DrawerHeader>
// 		<div className="flex-1 p-4">
// 			<div className="rounded-2xl bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
// 		</div>
// 		<DrawerFooter>
// 			<DrawerClose render={<Button>Close</Button>} />
// 		</DrawerFooter>
// 	</DrawerContent>
// </Drawer>

// <Drawer snapPoints={SNAP_POINTS} showSwipeHandle>
// 	<DrawerTrigger render={<Button variant="outline">Open Snap Drawer</Button>} />
// 	<DrawerContent>
// 		<DrawerHeader>
// 			<DrawerTitle>Snap points</DrawerTitle>
// 			<DrawerDescription>
// 				Drag the drawer to snap between a compact peek and a near
// 				full-height view.
// 			</DrawerDescription>
// 		</DrawerHeader>
// 		<div className="flex-1 p-4">
// 			<div className="rounded-2xl bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
// 		</div>
// 		<DrawerFooter>
// 			<DrawerClose render={<Button>Close</Button>} />
// 		</DrawerFooter>
// 	</DrawerContent>
// </Drawer>

// <Drawer>
// 	<Drawer.Trigger id={1}></Drawer.Trigger>
// 	<Drawer.ContentGroup>
// 		<Drawer.Content id={1}>
// 			<Drawer.Trigger id={2}></Drawer.Trigger>
// 		</Drawer.Content>
// 		<Drawer.Content id={2}></Drawer.Content>
// 		<Drawer.Content id={3}></Drawer.Content>
// 		<Drawer.Content id={4}></Drawer.Content>
// 	</Drawer.ContentGroup>
// <Drawer>
