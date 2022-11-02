sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/core/routing/HashChanger",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/Ancestor",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/AggregationLengthEquals",
	"sap/ui/test/matchers/BindingPath"

], function (Opa5, HashChanger, Press, Ancestor, Properties, AggregationLengthEquals, BindingPath) {
	"use strict";

	function getFrameUrl(sHash, sUrlParameters) {
			var sUrl = jQuery.sap.getResourcePath("nw/epm/refapps/shop/app", ".html");
			var sNewHash = sHash || "";
			var sNewUrlParameters = sUrlParameters ? "?" + sUrlParameters : "";

			if (sNewHash) {
				sNewHash = "#EPMProduct-shop&/" + (sNewHash.indexOf("/") === 0 ? sNewHash.substring(1) : sNewHash);
			} else {
				sNewHash = "#EPMProduct-shop";
			}

			return sUrl + sNewUrlParameters + sNewHash;
		
	}

	return Opa5.extend("nw.epm.refapps.shop.test.integration.pages.Common", {

		iStartTheApp: function(oOptions) {
				var oNewOptions = oOptions || {};
				this.iStartMyAppInAFrame(getFrameUrl(oNewOptions.hash));
			},

		iTearDownFunction: function () {
			this.iTeardownMyAppFrame();
		},

		iEnterDateWithDatePicker: function (sText, sViewName, iFragment) {
			var date = new Date(sText);
			return this.waitFor({
				searchOpenDialogs: true,
				controlType: "sap.m.DatePicker",
				viewName: sViewName,
				success: function (aDatePicker) {
					// var t = aDatePicker[0]._formatValue(date, "string");
					aDatePicker[0].setDateValue(date);
					aDatePicker[0].fireChange({
						valid: true
					});
					ok(true, "Date Changed");
				},
				errorMessage: "Was not able to find Link"
			});
		},

		iSelectItem: function (sId, sValue, sViewName, bSearchOpenDialogs) {
			return this.waitFor({
				viewName: sViewName,
				id: sId,
				searchOpenDialogs: bSearchOpenDialogs,
				actions: new Press(),
				success: function (oSelect) {
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.ui.core.Item",
						matchers: new Ancestor(oSelect[0]),
						success: function (aItems) {
							aItems.some(function (oItem) {
								if (oItem.getText() === sValue) {
									new Press().executeOn(oItem);
									return true;
								}
							});
						}
					});
				},
				errorMessage: "Failed to find the item in sap.m.Select.'"
			});
		},

		iSeeActionSheet: function () {
			return this.waitFor({
				searchOpenDialogs: true,
				controlType: "sap.m.ActionSheet",
				success: function (aActionSheet) {
					ok(true, "Found Reporting phases Actionsheet");
				},
				error: function () {
					ok(false, "There is no Reporting phases Actionsheet found");
				}
			});
		},
		iClickOnActionSheetButton: function (iButtonIndex, iButtonText, sViewName) {
			this.waitFor({
				searchOpenDialogs: true,
				controlType: "sap.m.Button",
				viewName: sViewName,
				properties: {
					text: iButtonText
				},
				ancestor: {
					controlType: "sap.m.ActionSheet",
					viewName: sViewName,
					searchOpenDialogs: true
				},
				actions: new Press(),
				timeout: 20
			});
			return this;
		},

		_clickOnActionSheetButton: function (oActionSheet, iButtonIndex, that) {
			var row = that._getActionSheetButton(oActionSheet, iButtonIndex);
			if (row !== null) {
				ok(true, "Click on Reporting Phase actionsheet successful");
				row.firePress();
				return true;
			} else {
				ok(false, "Click on Reporting Phase actionsheet not successful");
				return false;
			}
		},

		_getActionSheetButton: function (oActionSheet, iBtnIdx) {
			var btnIdx = iBtnIdx ? iBtnIdx : 0;
			var aButtons = oActionSheet.getButtons();
			if (aButtons.length > iBtnIdx) {
				return aButtons[iBtnIdx];
			} else {
				return null;
			}
		},

		iClickButton: function (sButtonText, sViewName, iFragment) {
			return this.waitFor({
				searchOpenDialogs: iFragment,
				controlType: "sap.m.Button",
				viewName: sViewName,
				properties: {
					text: sButtonText
				},
				actions: new Press(),
				success: function () {
					Opa5.assert.ok(true, " The " + sButtonText + " button was pressed");
				},
				errorMessage: "Was not able to find the button with text " + sButtonText,
				timeout: 30
			});
		},
		iPressRowWithPath: function (sPath, sViewName, iTableId) {
			return this.waitFor({
				controlType: "sap.ui.core.Icon",
				viewName: sViewName,
				properties: {
					src: {
						regex: {
							source: "slim\\-arrow\\-right"
						}
					}
				},
				ancestor: {
					controlType: "sap.m.ColumnListItem",
					viewName: sViewName,
					bindingPath: {
						path: sPath
					}

				},
				actions: new Press(),
			});
		},
		iPressRowWithLink: function (sPath, sPropertyPath, sModelName, sViewName, iTableId) {
			return this.waitFor({
				controlType: "sap.m.Link",
				viewName: sViewName,
				//ancestor: {
				//	controlType: "sap.ui.table.Row",
				//viewName: sViewName,
				bindingPath: {
					path: sPath,
					propertyPath: sPropertyPath,
					modelName: sModelName
				},
				//},
				actions: new Press(),
			});
		},

		iPressRow: function (sPath, sPropertPath, sViewName) {
			return this.waitFor({
				controlType: "sap.m.ColumnListItem",
				viewName: sViewName,
				actions: new Press(),
				descendant: {
					controlType: "sap.m.Text",
					viewName: sViewName,
					bindingPath: {
						path: sPath,
						propertyPath: sPropertPath
					}
				},
				success: function () {
					Opa5.assert.ok(true, " The row was clicked");
				}

			});
		},
		iPressIconWithControlId: function (iControlId, sViewName) {
			this.waitFor({
				id: iControlId,
				actions: new Press()
			});

		},

		iSeeSmartFilterBar: function (iControlId, iFragment, sViewName) {
			return this.waitFor({
				id: iControlId,
				viewName: sViewName,
				controlType: "sap.ui.comp.smartfilterbar.SmartFilterBar",
				searchOpenDialogs: iFragment,
				success: function (oSmartFilterBar) {
					this.getContext().oSmartFilterBar = oSmartFilterBar;
					ok(oSmartFilterBar, "Found the smart filter bar");
				},
				errorMessage: "Can't see smartFilterBar"
			});
		},
		iSeeTable: function (iControlId, iFragment, sViewName) {
			return this.waitFor({
				id: iControlId,
				viewName: sViewName,
				controlType: "sap.m.Table",
				searchOpenDialogs: iFragment,
				success: function (oTable) {
					this.getContext().oTable = oTable;
					ok(oTable, "Found the Table");
				},
				errorMessage: "Can't see Table",
				timeout: 30
			});
		},
		iSeeEntriesinTableWithId: function (sId, iNumOfRecords, iFragment, sViewName) {
			return this.waitFor({
				id: sId,
				viewName: sViewName,
				searchOpenDialogs: iFragment,
				matchers: new AggregationLengthEquals({
					name: "items",
					length: iNumOfRecords
				}),
				success: function () {
					Opa5.assert.ok(true, "The table has " + iNumOfRecords + " items");
				},
				errorMessage: "The table does not have " + iNumOfRecords + "records.",
				timeout: 30
			});
		},
		iSeeEntriesinTreeTableWithId: function (sId, iNumOfRecords, sViewName) {
			return this.waitFor({
				id: sId,
				viewName: sViewName,
				matchers: new AggregationLengthEquals({
					name: "rows",
					length: iNumOfRecords
				}),
				success: function () {
					Opa5.assert.ok(true, "The table has " + iNumOfRecords + " items");
				},
				errorMessage: "The table does not have " + iNumOfRecords + "records.",
				timeout: 30
			});
		},
		iSelectAllInTreeTableWithId: function (sId, sViewName) {
			return this.waitFor({
				id: sId,
				viewName: sViewName,
				success: function (oTreeTable) {
					oTreeTable.selectAll();
					// oTreeTable.expand(1);
					// oTreeTable.fireToggleOpenState({
					// 	rowIndex: 1,
					// 	expanded: true
					// });

				},
				errorMessage: "Select all is unsuccessful for the Tree Table with id " + sId,
				timeout: 30
			});
		},
		iSelectOrDeselectRowTreeTableWithIndex: function (sId, bSelect, iIndex, sViewName) {
			return this.waitFor({
				id: sId,
				viewName: sViewName,
				actions: new Press({
					idSuffix: "rowsel" + iIndex
				}),
				timeout: 30
			});
		},
		iSeeTreetableChildrenSelectedOrDeselected: function (sTableId, iIndex, bIsExpectedToBeSelected, sViewName) {
			return this.waitFor({
				id: sTableId,
				viewName: sViewName,
				controlType: "sap.ui.table.TreeTable",
				success: function (oTreeTable) {
					if (bIsExpectedToBeSelected) {
						oTreeTable.isIndexSelected(iIndex) ? Opa5.assert.ok(true, "Child Row with index " + iIndex + " is selected as expected") :
							Opa5
							.assert.ok(
								false);
					} else {
						oTreeTable.isIndexSelected(iIndex) ? Opa5.assert.ok(false) : Opa5.assert.ok(
							true, "Child Row with index " + iIndex + " is deselected as expected");

					}
				},
				errorMessage: "Child Row with index " + iIndex + " is not selected",
				timeout: 90
			});
		},
		iClickExpandTreetableRowWithBindingPathAndView: function (sBinding, sPath, sView) {
			this.waitFor({
				controlType: "sap.ui.table.Row",
				viewName: sView,
				matchers: new BindingPath({
					modelName: sBinding,
					path: sPath
				}),
				actions: new Press({
					idSuffix: "treeicon"
				})
			});
		},
		iClickExpandTreeNodeWithBindingPath: function (sBinding, sPath, sView) {
			this.waitFor({
				controlType: "sap.m.StandardTreeItem",
				viewName: sView,
				matchers: new BindingPath({
					modelName: sBinding,
					path: sPath
				}),
				actions: new Press({
					idSuffix: "expander"
				})
			});
		},
		iSeeButtonWithText: function (sButtonText, sViewName, iFragment) {
			return this.waitFor({
				controlType: "sap.m.Button",
				viewName: sViewName,
				searchOpenDialogs: iFragment,
				matchers: new Properties({
					text: sButtonText
				}),
				success: function (oButton) {
					ok(true, "Button '" + sButtonText + "' is visible and active");
				},
				errorMessage: "Button is not found"
			});
		},

		iSeeButtonIconCommon: function (sButtonId, sViewName) {
			return this.waitFor({
				controlType: "sap.m.Button",
				viewName: sViewName,
				id: sButtonId,
				success: function (oButton) {
					ok(true, "Button '" + sButtonId + "' is visible and active");
				},
				errorMessage: "Button with  is not found"
			});
		},
		createAWaitForAnEntitySet: function (oOptions) {
			return {
				success: function () {
					var bMockServerAvailable = false,
						aEntitySet;

					this.getMockServer().then(function (oMockServer) {
						aEntitySet = oMockServer.getEntitySetData(oOptions.entitySet);
						bMockServerAvailable = true;
					});

					return this.waitFor({
						check: function () {
							return bMockServerAvailable;
						},
						success: function () {
							oOptions.success.call(this, aEntitySet);
						},
						errorMessage: "was not able to retireve the entity set " + oOptions.entitySet
					});
				}
			};
		},
		iSeeDialog: function (sId, sViewName) {
			return this.waitFor({
				controlType: "sap.m.Dialog",
				id: sId,
				viewName: sViewName,
				searchOpenDialogs: true,
				success: function () {
					Opa5.assert.ok(true, "The dialog is found");
				},
				errorMessage: "The dialog is not found"
			});
		},

		iSeeInactiveButtonInPage: function (sId, sViewName, iFragment) {
			return this.waitFor({
				id: sId,
				viewName: sViewName,
				matchers: [
					new Properties({
						enabled: false
					})
				],
				searchOpenDialogs: iFragment,
				check: function (oButton) {
					if (oButton.getVisible() && oButton.getEnabled() === false) {
						return true;
					} else {
						return false;
					}
				},

				success: function (oButton) {
					if (oButton.getVisible() && oButton.getEnabled() === false) {
						ok(true, "[" + sViewName + "] Button '" + oButton.getText() + "' is visible and inactive");
					} else {
						ok(false, "[" + sViewName + "] Button with id '" + sId + "' is not visible or active");
					}
				},
				error: function () {
					ok(false, "[" + sViewName + "] Button with id '" + sId + "' is not found");
				},
				autoWait: false
			});
		},
		// iSeeValueState: function (iFldIdx, sViewName, sValueState) {
		// 	return this.waitFor({
		// 		controlType: "sap.m.Input",
		// 		viewName: sViewName,
		// 		success: function (aInputs) {
		// 			aInputs[iFldIdx].getValueState() === sValueState;
		// 			ok(true, "Field has " + sValueState + " value state");
		// 		},
		// 		error: function () {
		// 			ok(false, "Field has no " + sValueState + " value state");
		// 		}
		// 	});
		// },

		getMockServer: function () {
			return new Promise(function (success) {
				Opa5.getWindow().sap.ui.require(["gs/fin/runstatutoryreports/s1/localService/mockserver"], function (mockserver) {
					success(mockserver.getMockServer());
				});
			});
		},

		iStartMyAppOnADesktopToTestErrorHandler: function (sParam) {
			this.iStartMyAppInAFrame(getFrameUrl("", sParam));
		}

	});

});